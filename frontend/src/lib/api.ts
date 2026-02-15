const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface RequestOptions {
  text: string;
  api_key: string;
  model: string;
  provider: string;
  source_lang: string;
  target_lang: string;
  level: string;
  system_prompt?: string;
}

export async function analyzeText(options: RequestOptions) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Analysis failed");
  }
  return res.json();
}

export async function getVocabulary(options: RequestOptions) {
  const res = await fetch(`${API_BASE}/api/vocabulary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Vocabulary extraction failed");
  }
  return res.json();
}

export async function getGrammar(options: RequestOptions) {
  const res = await fetch(`${API_BASE}/api/grammar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Grammar analysis failed");
  }
  return res.json();
}

interface TTSOptions {
  text: string;
  api_key: string;
  provider: string;
  voice: string;
  lang: string;
}

export async function getTTS(options: TTSOptions): Promise<Blob> {
  const res = await fetch(`${API_BASE}/api/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "TTS generation failed");
  }
  return res.blob();
}

interface HandoutOptions {
  analyze_data: Record<string, unknown>;
  vocabulary_data: Record<string, unknown>;
  grammar_data: Record<string, unknown>;
  format: "pdf" | "html";
  title?: string;
  source_lang: string;
  target_lang: string;
  level: string;
}

export async function getHandout(options: HandoutOptions): Promise<Blob> {
  const endpoint =
    options.format === "pdf" ? "/api/handout/pdf" : "/api/handout/html";
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Handout generation failed");
  }
  return res.blob();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}
