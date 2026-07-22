export const SITE = {
  name: "TableOS",
  tagline: "The Financial Operating System for Premium Dining.",
  description:
    "TableOS is financial infrastructure for luxury dining businesses — USDC payments, programmable escrow, automatic settlement, and treasury — built for Circle’s Arc network.",
  url: "https://tableos-delta.vercel.app",
  github: "https://github.com/0xjiongying/tableos",
  demoBook: "/book/kintsugi",
  demoStaff: "/staff/login",
  demoCredentials: { email: "host@kintsugi.tokyo", password: "tableos-demo" },
} as const;

export const ARC = {
  name: "Arc",
  tagline: "Economic OS for the internet",
  site: "https://www.arc.network/",
  docs: "https://docs.arc.network/",
  blog: "https://www.arc.network/blog",
  github: "https://github.com/circlefin/arc-node",
  ecosystem: "https://www.arc.network/ecosystem",
  community: "https://community.arc.network/",
  explorer: "https://testnet.arcscan.app",
  rpc: "https://rpc.testnet.arc.network",
  chainId: 5042002,
  /** Verified public facts — keep copy aligned with docs/research/ARC_BRIEF.md */
  summary:
    "Circle’s stablecoin-native, EVM-compatible L1 — purpose-built for real-world finance with USDC, deterministic finality, and institutional settlement primitives.",
  testnetLaunched: "October 28, 2025",
  mainnetTarget: "2026",
  finalityMs: 780,
  consensus: "Malachite BFT",
  execution: "Reth-based EVM",
  gas: "USDC as primary gas (stablecoin-native, fiat-denominated costs)",
  privacy: "Opt-in configurable privacy for compliance",
  partnersNote:
    "Circle-backed; design partners referenced in the Arc ecosystem include Goldman Sachs, Visa, and Mastercard (also BlackRock and AWS).",
  tokenNote:
    "No Arc mainnet token is live; a token is under exploration. TableOS does not depend on an Arc token.",
  honesty:
    "TableOS’s live demo uses a mock payments adapter. Arc adapters are scaffolded for testnet — we never fake on-chain success.",
} as const;

export const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/technology", label: "Technology" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/#demo", label: "Demo" },
] as const;

export const FEATURES = [
  {
    id: "usdc-payments",
    title: "USDC Payments",
    problem:
      "Card rails settle slowly, charge high fees on high-ticket covers, and leave finance teams reconciling days later.",
    solution:
      "Guests pay in USDC at booking. Payment intents bind to the reservation; settlement is designed for Arc’s USDC-native rails.",
    impact:
      "Fewer failed collections on scarce seats, faster cash recognition, and one ledger line per evening — not a pile of processor exports.",
    arc: "Arc is stablecoin-native with USDC as primary gas — predictable fiat-denominated costs instead of volatile L1 gas for every hold and release.",
  },
  {
    id: "programmable-escrow",
    title: "Programmable Escrow",
    problem:
      "Deposits sit in operating accounts or third-party processors with manual release rules staff cannot reliably enforce.",
    solution:
      "Funds are held under explicit conditions — typically attendance — and released or returned by policy, not spreadsheet judgment.",
    impact:
      "No-show risk is priced into the booking. Guests trust the hold; operators trust the release.",
    arc: "Sub-second deterministic finality (~780ms, Malachite BFT) means escrow state is settlement-grade — not probabilistic finality with re-org risk.",
  },
  {
    id: "revenue-distribution",
    title: "Revenue Distribution",
    problem:
      "After a sold-out tasting, house, partners, and venues reconcile splits by hand — errors and delays follow.",
    solution:
      "On verified attendance, TableOS settles the evening and splits revenue according to predefined rules.",
    impact:
      "Partners get paid with the event, not weeks later. Finance closes the night with an auditable trail.",
    arc: "Programmable USDC on an EVM L1 purpose-built for payments lets split logic execute with the settlement — Stripe/card rails cannot collapse multi-party payout into one atomic condition.",
  },
  {
    id: "treasury-dashboard",
    title: "Treasury Dashboard",
    problem:
      "Operators know covers sold, not what is held, released, or owed across events and partners.",
    solution:
      "A single treasury view shows held funds, settled revenue, and pending obligations for the house.",
    impact:
      "Owners make capital decisions from live settlement state instead of waiting on month-end accounting.",
    arc: "Deterministic finality and USDC-native accounting map held vs settled balances to the same truth the network enforces.",
  },
  {
    id: "ai-treasury",
    title: "AI Treasury Assistant",
    problem:
      "Operators drown in reservation noise when they need a clear answer: what settled, what is held, what needs attention.",
    solution:
      "An assistant summarizes settlement posture and helps staff find reservations in natural language over demo or live data.",
    impact:
      "Managers brief before service in seconds — without opening five tools.",
    arc: "Arc targets real-world finance and the agentic economy; TableOS keeps AI on structured settlement events, not speculative chain theatre.",
  },
] as const;

export const USE_CASES = [
  {
    title: "Michelin & omakase houses",
    body: "Sell scarce tasting inventory with deposits held until the guest arrives, then settle the house cleanly.",
  },
  {
    title: "Hotel fine dining & residencies",
    body: "Coordinate multi-party evenings — chef, venue, hotel — with automatic revenue splits after attendance.",
  },
  {
    title: "Private dining & experiential events",
    body: "Treat each evening as a financial workflow: book, hold, attest, settle — not a spreadsheet project.",
  },
] as const;

export const WHY_ARC = [
  {
    title: "Stablecoin-native gas (USDC)",
    body: "USDC is primary gas on Arc — settlement costs stay fiat-denominated and predictable. Volatile gas on general L1s makes high-ticket hospitality economics opaque.",
  },
  {
    title: "Deterministic finality (~780ms)",
    body: "Malachite BFT delivers sub-second deterministic finality — no re-org risk for escrow release and partner splits. Probabilistic finality is unacceptable for conditioned commercial money.",
  },
  {
    title: "USDC-native real-world finance",
    body: "Arc is Circle’s L1 built for stablecoins, payments, tokenized assets, and capital-markets workflows — not consumer speculation. TableOS settles obligations in USDC.",
  },
  {
    title: "Opt-in privacy for compliance",
    body: "Configurable privacy primitives support enterprise and regulated postures without turning the dining room into a public mempool spectacle.",
  },
  {
    title: "Institutional stack",
    body: "Circle-backed infrastructure with design partners referenced across the ecosystem (including Goldman Sachs, Visa, Mastercard). EVM + Reth execution, CCTP/Gateway, and App Kit for USDC flows.",
  },
] as const;

export const WHY_NOT_ALTERNATIVES = [
  {
    title: "Why not Stripe / card rails alone?",
    body: "Cards authorize and batch-settle. They do not natively hold funds until attendance, then atomically split house and partner shares into treasury as one programmable workflow.",
  },
  {
    title: "Why not a general L1 / L2?",
    body: "Volatile gas, probabilistic finality or re-orgs, and weak stablecoin/compliance tooling fight settlement products. Arc’s primitives match escrow → condition → split → treasury.",
  },
] as const;

export const ENTERPRISE = [
  {
    title: "Security",
    body: "Least-privilege staff access, audited settlement actions, and adapters that never pretend a chain call succeeded when it did not.",
  },
  {
    title: "Compliance posture",
    body: "Clear separation of guest UX and settlement mechanics. Arc’s opt-in privacy supports compliance-oriented design; product language stays plain for operators.",
  },
  {
    title: "Auditability",
    body: "Every hold, check-in, release, and split is an event. Finance can reconstruct an evening without forensic archaeology.",
  },
  {
    title: "Reliability",
    body: "Demo and production paths use ports and adapters — payments and AI degrade honestly when providers are offline.",
  },
  {
    title: "Scalability",
    body: "Beachhead is premium dining. Architecture is condition-gated settlement on institutional USDC rails — extensible beyond a single restaurant skin.",
  },
  {
    title: "Availability & transparency",
    body: "Operators see held vs settled state in product. Network status is labeled clearly: mock demo adapter today; Arc testnet when wired.",
  },
] as const;

export const FAQ = [
  {
    q: "Is TableOS a restaurant website builder?",
    a: "No. TableOS is financial infrastructure for premium dining — payments, escrow, settlement, distribution, and treasury — with a calm hospitality product shell so guests and staff can use it.",
  },
  {
    q: "Why programmable money?",
    a: "Hospitality already sells conditioned obligations: seats, deposits, partner splits. Programmable USDC lets those conditions execute automatically instead of living in ops debt.",
  },
  {
    q: "Why Arc?",
    a: "Arc is Circle’s stablecoin-native EVM L1 with USDC gas, ~780ms deterministic finality (Malachite BFT), and opt-in privacy — purpose-built for real-world finance. Card rails and general L1s cannot replace escrow → attendance → split → treasury as one settlement path.",
  },
  {
    q: "Is there an Arc token TableOS needs?",
    a: "No. There is no Arc mainnet token live (a token is under exploration). TableOS settles in USDC and does not depend on an Arc token.",
  },
  {
    q: "Do you require a crypto wallet for the live demo?",
    a: "The production demo uses a mock payments adapter so anyone can complete guest and staff flows. Arc testnet adapters are scaffolded honestly — we do not fake on-chain success. Testnet RPC and explorer are documented on the Technology page.",
  },
  {
    q: "Who is this for?",
    a: "Luxury dining operators, hotel F&B, and experiential hosts who run high-value scarce inventory — and investors evaluating condition-gated settlement as a company, not a restaurant SaaS.",
  },
  {
    q: "What ships today?",
    a: "Event inventory, guest booking, payment hold confirmation, door attendance → release, staff dashboard, and an AI briefing path. Full POS, kitchen boards, and live Arc mainnet calls are explicitly out of v1 scope. Arc public testnet launched Oct 28, 2025; mainnet targeted 2026.",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    id: "create",
    label: "Create event",
    detail: "Staff publishes a scarce evening with capacity, price, and settlement rules.",
  },
  {
    id: "reserve",
    label: "Reserve",
    detail: "Guest claims a seat. Inventory locks against double-booking.",
  },
  {
    id: "pay",
    label: "USDC payment",
    detail: "Guest pays in USDC. Payment intent is bound to the reservation.",
  },
  {
    id: "escrow",
    label: "Escrow",
    detail: "Funds are held — not spent — until the attendance condition is met.",
  },
  {
    id: "attend",
    label: "Attendance",
    detail: "Door staff attest arrival. The condition that unlocks settlement is recorded.",
  },
  {
    id: "settle",
    label: "Auto settlement",
    detail: "Held funds release under policy. Designed for Arc’s deterministic USDC settlement.",
  },
  {
    id: "split",
    label: "Revenue split",
    detail: "House and partners receive predefined shares in one settlement pass.",
  },
  {
    id: "treasury",
    label: "Treasury updated",
    detail: "Balances and activity reflect the closed evening. Finance sees the same truth ops does.",
  },
] as const;

export const ARCH_NODES = [
  { id: "frontend", label: "Frontend", layer: "app", desc: "Guest book + staff OS (Next.js)" },
  { id: "backend", label: "Backend", layer: "app", desc: "API routes, domain services, auth" },
  { id: "db", label: "Database", layer: "data", desc: "Prisma · events, reservations, ledger" },
  { id: "wallet", label: "Wallet / App Kit", layer: "money", desc: "Payment intents · Arc App Kit–ready boundary" },
  {
    id: "arc",
    label: "Arc",
    layer: "money",
    desc: "Circle’s USDC-native EVM L1 · Malachite BFT · testnet Chain ID 5042002",
  },
  { id: "usdc", label: "USDC", layer: "money", desc: "Unit of account + Arc primary gas" },
  { id: "contracts", label: "Smart contracts", layer: "money", desc: "Escrow · condition · distribution (EVM)" },
  { id: "notify", label: "Notifications", layer: "ops", desc: "Confirmations · door · settlement" },
  { id: "monitor", label: "Monitoring", layer: "ops", desc: "Health · audit · activity stream" },
] as const;

export const CURRENT_FLOW = [
  "Customer pays",
  "Bank / card processor",
  "Accounting export",
  "Manual reconciliation",
  "Manual payouts",
  "Spreadsheet",
  "Treasury — eventually",
] as const;

export const FUTURE_FLOW = [
  "USDC pay",
  "Programmable escrow",
  "Auto settlement",
  "Revenue split",
  "Treasury updated",
  "Workflow complete",
] as const;

export const DEV_STACK = [
  { label: "App", value: "Next.js · React · TypeScript · Tailwind" },
  { label: "Data", value: "Prisma · Postgres-ready schema" },
  { label: "Payments port", value: "Mock adapter (live demo) · Arc adapter scaffold" },
  { label: "Settlement network", value: "Arc (Circle) · EVM · Reth execution · Malachite BFT" },
  { label: "Multichain USDC", value: "CCTP / Gateway (Arc ecosystem)" },
  { label: "USDC app flows", value: "Arc App Kit (integration path)" },
] as const;
