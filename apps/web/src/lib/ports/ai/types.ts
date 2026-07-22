export type AiMessage = { role: "system" | "user" | "assistant"; content: string };

export type AiCompletionInput = {
  messages: AiMessage[];
  temperature?: number;
};

export type AiCompletionResult =
  | { ok: true; provider: "openai" | "fallback"; content: string; model: string }
  | { ok: false; provider: "openai" | "fallback"; message: string };

export type ReservationSearchHit = {
  id: string;
  guestName: string;
  confirmationCode: string;
  scheduledAt: string;
  status: string;
  partySize: number;
  eventTitle?: string;
};

export interface AiPort {
  complete(input: AiCompletionInput): Promise<AiCompletionResult>;
  summarizeOperations(input: {
    restaurantName: string;
    reservationsTonight: number;
    escrowedCents: number;
    releasedCents: number;
    noShows: number;
    notes?: string[];
  }): Promise<AiCompletionResult>;
  searchReservationsNaturalLanguage(input: {
    query: string;
    candidates: ReservationSearchHit[];
  }): Promise<AiCompletionResult & { hits?: ReservationSearchHit[] }>;
}
