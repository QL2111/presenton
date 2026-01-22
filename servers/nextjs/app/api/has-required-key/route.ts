import { NextResponse } from "next/server";
import fs from "fs";

export const dynamic = "force-dynamic";

/**
 * Checks if at least one LLM provider is configured.
 * Supports: OpenAI, Google, Anthropic, Ollama, Custom (OpenCode)
 */
export async function GET() {
  const userConfigPath = process.env.USER_CONFIG_PATH;

  let cfg: Record<string, string> = {};
  if (userConfigPath && fs.existsSync(userConfigPath)) {
    try {
      const raw = fs.readFileSync(userConfigPath, "utf-8");
      cfg = JSON.parse(raw || "{}");
    } catch { }
  }

  // Check each provider - file config OR env var
  const hasOpenAI = Boolean(
    (cfg.OPENAI_API_KEY || process.env.OPENAI_API_KEY || "").trim()
  );
  const hasGoogle = Boolean(
    (cfg.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || "").trim()
  );
  const hasAnthropic = Boolean(
    (cfg.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || "").trim()
  );
  const hasOllama = Boolean(
    (cfg.OLLAMA_URL || process.env.OLLAMA_URL || "").trim()
  );
  const hasCustom = Boolean(
    (cfg.CUSTOM_LLM_URL || process.env.CUSTOM_LLM_URL || "").trim()
  );
  const hasOpenCode = Boolean(
    (cfg.OPENCODE_URL || process.env.OPENCODE_URL || "").trim()
  );

  const hasKey = hasOpenAI || hasGoogle || hasAnthropic || hasOllama || hasCustom || hasOpenCode;

  return NextResponse.json({ hasKey });
} 