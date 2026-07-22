import { fallbackAiAdapter } from "./fallback-adapter";
import { openaiAiAdapter } from "./openai-adapter";
import type { AiPort } from "./types";

export type { AiPort } from "./types";
export * from "./types";

export function getAiPort(): AiPort {
  if (process.env.OPENAI_API_KEY && process.env.AI_ENABLED !== "false") {
    return openaiAiAdapter;
  }
  return fallbackAiAdapter;
}
