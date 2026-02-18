import { PromptInput } from "./types";
import { buildTemplate } from "./templates";

export function generatePrompt(input: PromptInput): string {
  return buildTemplate(input).trim();
}
