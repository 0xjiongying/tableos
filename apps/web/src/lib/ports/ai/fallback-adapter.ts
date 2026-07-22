import type {
  AiCompletionInput,
  AiCompletionResult,
  AiPort,
  ReservationSearchHit,
} from "./types";

function keywordHits(query: string, candidates: ReservationSearchHit[]): ReservationSearchHit[] {
  const q = query.toLowerCase().trim();
  if (!q) return candidates.slice(0, 8);
  return candidates
    .filter((c) => {
      const blob = `${c.guestName} ${c.confirmationCode} ${c.status} ${c.eventTitle ?? ""}`.toLowerCase();
      return q.split(/\s+/).every((token) => blob.includes(token) || c.confirmationCode.toLowerCase().includes(token));
    })
    .slice(0, 8);
}

/** Deterministic summaries when OPENAI_API_KEY is absent. */
export const fallbackAiAdapter: AiPort = {
  async complete(input: AiCompletionInput): Promise<AiCompletionResult> {
    const last = [...input.messages].reverse().find((m) => m.role === "user");
    return {
      ok: true,
      provider: "fallback",
      model: "fallback-heuristic",
      content: last
        ? `I can help with reservations and settlement once AI is configured. You asked: “${last.content.slice(0, 200)}”. Set OPENAI_API_KEY to enable full answers.`
        : "AI is running in fallback mode. Set OPENAI_API_KEY for richer assistance.",
    };
  },

  async summarizeOperations(input): Promise<AiCompletionResult> {
    const held = (input.escrowedCents / 100).toFixed(0);
    const released = (input.releasedCents / 100).toFixed(0);
    const content = [
      `${input.restaurantName} — evening brief (offline AI).`,
      `${input.reservationsTonight} reservations on the book; $${held} held in escrow; $${released} already released.`,
      input.noShows > 0
        ? `${input.noShows} no-show risk mark(s) — verify door list before release.`
        : "No no-shows flagged.",
      ...(input.notes ?? []).slice(0, 3),
    ].join(" ");
    return { ok: true, provider: "fallback", model: "fallback-heuristic", content };
  },

  async searchReservationsNaturalLanguage(input) {
    const hits = keywordHits(input.query, input.candidates);
    const content =
      hits.length === 0
        ? `No reservations matched “${input.query}”.`
        : `Found ${hits.length} match(es): ${hits.map((h) => `${h.guestName} (${h.confirmationCode})`).join(", ")}.`;
    return { ok: true, provider: "fallback", model: "fallback-heuristic", content, hits };
  },
};
