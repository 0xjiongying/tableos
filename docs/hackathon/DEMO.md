# FlowArc — Hackathon Demo Script

**Duration:** 4–6 minutes  
**Demo restaurant:** Kintsugi (Omotesando)  
**Payments:** mock adapter (say “held funds”; mention Arc-ready port if judges care)

---

## Setup (before stage)

```bash
docker compose up -d postgres
pnpm install && pnpm db:push && pnpm db:seed && pnpm dev
```

Tabs ready:

1. `http://localhost:3000` — home  
2. `http://localhost:3000/book/kintsugi` — guest  
3. `http://localhost:3000/staff/login` — staff  

Credentials: `host@kintsugi.tokyo` / `tableos-demo`

---

## Script

### 0:00 — Frame (30s)

> “Premium dining sells scarce seats. Today deposits are messy and partner splits are spreadsheets. FlowArc holds the guest’s payment until they arrive, then settles the house — calmly, without crypto theatre.”

Show home: Japanese luxury UI, not a dashboard.

### 0:30 — Guest book (90s)

1. Open guest book  
2. Choose **Spring Gold Seam**  
3. Book as a new guest (use a unique email)  
4. Land on confirmation: code + “held securely until attendance”

Say: “The guest never sees wallets or explorers.”

### 2:00 — Staff ops (90s)

1. Sign in as host  
2. Dashboard: active reservations, held funds, activity  
3. Events list — mention split (house + ceramicist)  
4. Reservations table — new booking visible  

### 3:30 — Door / settlement (60s)

1. Open **Door**  
2. Check in the new guest → **Check in & release**  
3. Status becomes settled; activity shows release  

Say: “That’s the condition gate. Attendance is the release condition.”

### 4:30 — AI (45s)

1. Open **Briefing**  
2. Generate evening brief  
3. Search “Elena” or the new guest name  

Say: “AI is a real port — OpenAI when keyed, calm fallback otherwise.”

### 5:15 — Close (30s)

> “Restaurant OS on the outside. Settlement infrastructure underneath. Arc USDC adapter is scaffolded for when we flip the rail — we don’t fake chain calls today.”

Point judges to `docs/hackathon/PITCH.md` + `contracts/README.md`.

---

## Failure salvage

| Issue | Move |
|---|---|
| DB down | Restart postgres + re-seed |
| Booking capacity | Use Moon Tea Pairing or create event in Staff → Events |
| AI empty | Still shows fallback copy — lean into honesty |
