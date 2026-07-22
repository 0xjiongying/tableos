// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title TableOSEscrow
 * @notice SCAFFOLD ONLY — not audited, not deployed, not wired to the app.
 *
 * Intended flow:
 * 1) payer deposits USDC into escrow keyed by obligationId
 * 2) attestor releases on condition (attendance)
 * 3) funds split to payees by bps; platform fee skimmed
 *
 * TODO(arc):
 * - Integrate OpenZeppelin Pausable, ReentrancyGuard, Ownable2Step
 * - Use Circle USDC on Arc testnet
 * - Add EIP-712 attestor signatures
 * - Write Foundry tests + invariant suite before any mainnet consideration
 */
interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract TableOSEscrow {
    struct Split {
        address payee;
        uint16 bps; // out of 10_000
    }

    struct Obligation {
        address payer;
        uint256 amount;
        bool released;
        bool refunded;
        address attestor;
    }

    IERC20 public immutable usdc;
    address public platformFeeRecipient;
    uint16 public platformFeeBps;
    mapping(bytes32 => Obligation) public obligations;
    mapping(bytes32 => Split[]) internal splits;

    event Escrowed(bytes32 indexed id, address payer, uint256 amount);
    event Released(bytes32 indexed id, address attestor);
    event Refunded(bytes32 indexed id);

    constructor(address usdc_, address feeRecipient_, uint16 feeBps_) {
        usdc = IERC20(usdc_);
        platformFeeRecipient = feeRecipient_;
        platformFeeBps = feeBps_;
    }

    function createEscrow(
        bytes32 id,
        uint256 amount,
        address attestor,
        Split[] calldata splitRules
    ) external {
        require(obligations[id].payer == address(0), "exists");
        require(amount > 0, "amount");
        uint256 sum;
        for (uint256 i = 0; i < splitRules.length; i++) {
            sum += splitRules[i].bps;
            splits[id].push(splitRules[i]);
        }
        require(sum == 10_000, "bps");
        require(usdc.transferFrom(msg.sender, address(this), amount), "transfer");
        obligations[id] = Obligation({
            payer: msg.sender,
            amount: amount,
            released: false,
            refunded: false,
            attestor: attestor
        });
        emit Escrowed(id, msg.sender, amount);
    }

    function release(bytes32 id) external {
        Obligation storage o = obligations[id];
        require(o.payer != address(0), "missing");
        require(!o.released && !o.refunded, "closed");
        require(msg.sender == o.attestor, "attestor");
        o.released = true;

        uint256 fee = (o.amount * platformFeeBps) / 10_000;
        uint256 net = o.amount - fee;
        if (fee > 0) {
            require(usdc.transfer(platformFeeRecipient, fee), "fee");
        }
        Split[] storage s = splits[id];
        uint256 paid;
        for (uint256 i = 0; i < s.length; i++) {
            uint256 share = (net * s[i].bps) / 10_000;
            paid += share;
            require(usdc.transfer(s[i].payee, share), "split");
        }
        // remainder dust to first payee — production should track precisely
        if (paid < net && s.length > 0) {
            require(usdc.transfer(s[0].payee, net - paid), "dust");
        }
        emit Released(id, msg.sender);
    }

    function refund(bytes32 id) external {
        Obligation storage o = obligations[id];
        require(o.payer != address(0), "missing");
        require(!o.released && !o.refunded, "closed");
        require(msg.sender == o.attestor || msg.sender == o.payer, "auth");
        o.refunded = true;
        require(usdc.transfer(o.payer, o.amount), "refund");
        emit Refunded(id);
    }
}
