import OpenAI from "openai";
import { fallbackAiAdapter } from "./fallback-adapter";
import type { AiCompletionInput, AiCompletionResult, AiPort, ReservationSearchHit } from "./types";

function client(): OpenAI | null {
  if (process.env.AI_ENABLED === "false") return null;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

function model() {
  return process.env.OPENAI_MODEL ?? "gpt-4o-mini";
}

async function completeOpenAi(input: AiCompletionInput): Promise<AiCompletionResult> {
  const openai = client();
  if (!openai) return fallbackAiAdapter.complete(input);
  try {
    const res = await openai.chat.completions.create({
      model: model(),
      temperature: input.temperature ?? 0.3,
      messages: input.messages,
    });
    const content = res.choices[0]?.message?.content?.trim();
    if (!content) {
      return { ok: false, provider: "openai", message: "Empty completion." };
    }
    return { ok: true, provider: "openai", model: model(), content };
  } catch (err) {
    const message = err instanceof Error ? err.message : "OpenAI error";
    const fallback = await fallbackAiAdapter.complete(input);
    if (fallback.ok) {
      return {
        ...fallback,
        content: `${fallback.content}\n\n(Note: OpenAI unavailable — ${message})`,
      };
    }
    return { ok: false, provider: "openai", message };
  }
}

export const openaiAiAdapter: AiPort = {
  complete: completeOpenAi,

  async summarizeOperations(input) {
    const openai = client();
    if (!openai) return fallbackAiAdapter.summarizeOperations(input);
    return completeOpenAi({
      messages: [
        {
          role: "system",
          content:
            "You are TableOS, a calm concierge for a Michelin-level restaurant. Write 2–4 short sentences. No crypto jargon. Prefer “held funds” over “escrow” unless necessary. Be precise with numbers.",
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
    });
  },

  async searchReservationsNaturalLanguage(input: {
    query: string;
    candidates: ReservationSearchHit[];
  }) {
    const openai = client();
    if (!openai) return fallbackAiAdapter.searchReservationsNaturalLanguage(input);

    const result = await completeOpenAi({
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "Match guest reservation search queries to candidates. Reply with JSON only: {\"ids\":[\"...\"],\"summary\":\"...\"}. Use candidate ids only.",
        },
        {
          role: "user",
          content: JSON.stringify({ query: input.query, candidates: input.candidates }),
        },
      ],
    });

    if (!result.ok) {
      return fallbackAiAdapter.searchReservationsNaturalLanguage(input);
    }

    try {
      const parsed = JSON.parse(result.content) as { ids?: string[]; summary?: string };
      const idSet = new Set(parsed.ids ?? []);
      const hits = input.candidates.filter((c) => idSet.has(c.id));
      return {
        ok: true as const,
        provider: "openai" as const,
        model: result.model,
        content: parsed.summary ?? result.content,
        hits: hits.length ? hits : input.candidates.slice(0, 0),
      };
    } catch {
      return fallbackAiAdapter.searchReservationsNaturalLanguage(input);
    }
  },
};
