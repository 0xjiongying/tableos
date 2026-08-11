# Database

## ER (core vertical slice + OS stubs)

```mermaid
erDiagram
  Restaurant ||--o{ Branch : has
  Restaurant ||--o{ StaffMember : employs
  Restaurant ||--o{ Guest : hosts
  Restaurant ||--o{ DiningEvent : publishes
  Restaurant ||--o{ Payment : receives
  Restaurant ||--o{ Activity : logs
  Branch ||--o{ DiningTable : has
  Branch ||--o{ Reservation : hosts
  DiningEvent ||--o{ Reservation : inventories
  DiningEvent ||--o{ RevenueSplitRule : splits
  Guest ||--o{ Reservation : books
  Reservation ||--o{ Payment : pays
  Reservation ||--o{ Order : may_have
  Order ||--o{ OrderItem : contains
  Order ||--o{ KitchenTicket : tickets
  MenuCategory ||--o{ MenuItem : groups
  Payment ||--o{ BlockchainEvent : may_emit
  Restaurant ||--o{ AiConversation : briefs
  AiConversation ||--o{ AiMessage : has
```

## Notes

- Money stored as **integer cents**
- Split rules in **basis points** (10000 = 100%)
- `BlockchainEvent` / `AgentEvent` are forward-compatible stubs
- Kitchen / menu / loyalty fields exist for OS vision; v1 UI does not operate them end-to-end

## Migrations

Dev: `npm run db:push`  
Prod: prefer `npm run db:migrate` once migration history is established
