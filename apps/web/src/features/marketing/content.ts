export const SITE = {
  name: "TableOS",
  tagline: "The operating system of hospitality.",
  description:
    "TableOS makes service feel effortless — bookings, attendance, and programmable USDC settlement choreographed as one quiet evening workflow for premium dining on Arc.",
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
  { href: "/#lifecycle", label: "Demo" },
] as const;

/** Core MVP — keep marketing feature lists aligned to these six only */
export const FEATURES = [
  {
    id: "event-reservations",
    title: "Premium dining event reservations",
    problem:
      "Scarce tasting and residency inventory is sold through tools that stop at the booking — finance still closes the night elsewhere.",
    solution:
      "Operators publish premium dining events with capacity, price, and settlement rules bound to each reservation.",
    impact:
      "Inventory, payment, and settlement start as one obligation — not a reservation record plus a separate ledger chase.",
    arc: "Reservation intents are designed to bind to Arc USDC payment and escrow state from the first hold.",
  },
  {
    id: "usdc-payments",
    title: "USDC payments on Arc",
    problem:
      "Card rails settle slowly, charge high fees on high-ticket covers, and leave finance teams reconciling days later.",
    solution:
      "Guests pay in USDC at booking. Payment intents bind to the reservation on Arc’s stablecoin-native rails.",
    impact:
      "Fewer failed collections on scarce seats, faster cash recognition, and one ledger line per evening — not a pile of processor exports.",
    arc: "Arc is stablecoin-native with USDC as primary gas — predictable fiat-denominated costs instead of volatile L1 gas for every hold and release.",
  },
  {
    id: "smart-contract-escrow",
    title: "Smart contract escrow",
    problem:
      "Deposits sit in operating accounts or third-party processors with manual release rules staff cannot reliably enforce.",
    solution:
      "Funds are held in smart contract escrow under explicit conditions — typically attendance — and released or returned by policy.",
    impact:
      "No-show risk is priced into the booking. Guests trust the hold; operators trust the release.",
    arc: "Sub-second deterministic finality (~780ms, Malachite BFT) means escrow state is settlement-grade — not probabilistic finality with re-org risk.",
  },
  {
    id: "revenue-distribution",
    title: "Automatic revenue distribution",
    problem:
      "After a sold-out tasting, house, partners, and venues reconcile splits by hand — errors and delays follow.",
    solution:
      "On verified attendance, TableOS settles the evening and distributes revenue according to predefined rules.",
    impact:
      "Partners get paid with the event, not weeks later. Finance closes the night with an auditable trail.",
    arc: "Programmable USDC on an EVM L1 purpose-built for payments lets split logic execute with the settlement — Stripe/card rails cannot collapse multi-party payout into one atomic condition.",
  },
  {
    id: "treasury-dashboard",
    title: "Real-time treasury dashboard",
    problem:
      "Operators know covers sold, not what is held, released, or owed across events and partners.",
    solution:
      "A real-time treasury view shows held funds, settled revenue, and pending obligations for the house.",
    impact:
      "Owners make capital decisions from live settlement state instead of waiting on month-end accounting.",
    arc: "Deterministic finality and USDC-native accounting map held vs settled balances to the same truth the network enforces.",
  },
  {
    id: "ai-treasury",
    title: "AI-powered treasury assistant",
    problem:
      "Operators drown in reservation noise when they need a clear answer: what settled, what is held, what needs attention.",
    solution:
      "An AI-powered assistant summarizes treasury posture and helps staff find reservations in natural language over demo or live data.",
    impact:
      "Managers brief before service in seconds — without opening five tools.",
    arc: "Arc targets real-world finance and the agentic economy; TableOS keeps AI on structured settlement events, not speculative chain theatre.",
  },
] as const;

export const USE_CASES = [
  {
    title: "Restaurants",
    body: "Run high-ticket tasting and private-dining inventory with USDC payment, escrow, and treasury in one financial workflow.",
  },
  {
    title: "Chef’s tables",
    body: "Sell scarce chef-led seats with funds held until attendance, then settle the house without spreadsheet payouts.",
  },
  {
    title: "Luxury hotels",
    body: "Coordinate hotel F&B and visiting talent with automatic revenue distribution and a live treasury view.",
  },
  {
    title: "Dining event organizers",
    body: "Treat each residency or collaboration night as programmable money — reserve, escrow, distribute, update treasury.",
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
    body: "Cards authorize and batch-settle. They treat payments as isolated transactions — they do not turn each payment into an automated financial workflow from reservation through escrow, split, and treasury.",
  },
  {
    title: "Why not a general L1 / L2?",
    body: "Volatile gas, probabilistic finality or re-orgs, and weak stablecoin/compliance tooling fight settlement products. Arc’s stablecoin-native primitives match escrow → condition → split → treasury.",
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
    body: "Built for premium dining businesses today; designed to evolve into enterprise-grade financial infrastructure for global premium hospitality.",
  },
  {
    title: "Availability & transparency",
    body: "Operators see held vs settled state in product. Network status is labeled clearly: mock demo adapter today; Arc testnet when wired.",
  },
] as const;

export const FAQ = [
  {
    q: "What is TableOS?",
    a: "TableOS is the operating system of hospitality — with programmable USDC settlement underneath. Guests and staff feel a calm evening workflow; operators get escrow → attendance → split → treasury as one product path on Arc.",
  },
  {
    q: "Is TableOS a restaurant website builder?",
    a: "No. Dining is the beachhead skin, not a website builder or POS. TableOS choreographs service and condition-gated settlement so money and floor move together — without crypto chrome.",
  },
  {
    q: "Why programmable money?",
    a: "Premium dining already sells conditioned obligations: seats, deposits, partner splits. Programmable USDC on Arc lets those conditions execute automatically — simplifying operations, reducing manual reconciliation, and enabling real-time, cross-border commerce.",
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
    a: "Restaurants, chef’s tables, luxury hotels, and dining event organizers — premium dining businesses that need programmable money for payments, escrow, revenue distribution, and treasury.",
  },
  {
    q: "What ships today?",
    a: "Core MVP: premium dining event reservations, USDC payments on Arc, smart contract escrow, automatic revenue distribution, real-time treasury dashboard, and an AI-powered treasury assistant. Full POS, kitchen boards, and live Arc mainnet calls are out of v1 scope. Arc public testnet launched Oct 28, 2025; mainnet targeted 2026.",
  },
] as const;

/** Payment lifecycle — programmable money as protagonist */
export const LIFECYCLE_STEPS = [
  {
    id: "reservation",
    label: "Reservation",
    state: "authorization" as const,
    what: "Guest confirms the seat; payment is authorized in USDC.",
    why: "Scarce inventory requires commitment before service begins.",
  },
  {
    id: "commitment",
    label: "Commitment",
    state: "authorization" as const,
    what: "The payment intent binds to the reservation — trust begins.",
    why: "Authorization is the first visible state of the financial workflow.",
  },
  {
    id: "escrow",
    label: "Escrow",
    state: "escrow" as const,
    what: "Funds enter smart contract escrow as a secure hold.",
    why: "Value is contained until the business condition is met — not a spinner, a vessel.",
  },
  {
    id: "confirmation",
    label: "Confirmation",
    state: "confirmation" as const,
    what: "Attendance (or policy) confirms the condition that unlocks release.",
    why: "Settlement must be condition-gated, observable, and auditable.",
  },
  {
    id: "settlement",
    label: "Settlement",
    state: "settlement" as const,
    what: "Escrow unlocks; funds move with certainty on Arc.",
    why: "Deterministic finality makes release settlement-grade, not probabilistic.",
  },
  {
    id: "distribution",
    label: "Revenue distribution",
    state: "distribution" as const,
    what: "Streams split to restaurant, chef, venue, and organizer by rule.",
    why: "Multi-party evenings should settle as one workflow — not spreadsheet payouts.",
  },
  {
    id: "treasury",
    label: "Treasury update",
    state: "treasury" as const,
    what: "Held and settled balances rebalance into the live treasury view.",
    why: "Operators need cash position as truth, not month-end archaeology.",
  },
  {
    id: "insight",
    label: "Business insights",
    state: "forecast" as const,
    what: "AI treasury assistant summarizes what changed and what’s next.",
    why: "Intelligence explains the stream — never chat-first robot chrome.",
  },
] as const;

/** @deprecated Prefer LIFECYCLE_STEPS — kept for any residual imports */
export const WORKFLOW_STEPS = LIFECYCLE_STEPS.map((s) => ({
  id: s.id,
  label: s.label,
  detail: s.what,
  phase:
    s.state === "authorization"
      ? ("arrive" as const)
      : s.state === "escrow"
        ? ("wait" as const)
        : s.state === "confirmation"
          ? ("acknowledge" as const)
          : s.state === "settlement" || s.state === "distribution"
            ? ("handoff" as const)
            : ("complete" as const),
}));

/** Scroll / product chapters — payment lifecycle under premium dining setting */
export const SERVICE_CHAPTERS = [
  {
    id: "reservation",
    hour: "01",
    title: "Reservation & authorization",
    body: "The guest commits. USDC payment is authorized and bound to scarce inventory — trust begins as a financial state, not a booking receipt.",
    capability: "Premium dining event reservations · USDC on Arc",
  },
  {
    id: "escrow",
    hour: "02",
    title: "Escrow",
    body: "Funds enter smart contract escrow as a secure transition. Value is contained and visible — a vessel, never a spinner.",
    capability: "Smart contract escrow",
  },
  {
    id: "settlement",
    hour: "03",
    title: "Settlement & distribution",
    body: "On confirmation, escrow unlocks. Streams split to restaurant, chef, venue, and organizer — one payment becomes many paths.",
    capability: "Settlement · automatic revenue distribution",
  },
  {
    id: "treasury",
    hour: "04",
    title: "Treasury intelligence",
    body: "Cash position updates in real time. The AI treasury assistant explains what changed and offers a quiet forecast — summaries, not chatbots.",
    capability: "Real-time treasury · AI treasury assistant",
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
  "USDC pay on Arc",
  "Smart contract escrow",
  "Auto settlement",
  "Revenue distribution",
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
