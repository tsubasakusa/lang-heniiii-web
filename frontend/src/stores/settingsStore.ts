import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingsState {
  // AI Provider
  aiProvider: "openai" | "gemini";
  apiKey: string;
  model: string;

  // TTS Provider
  ttsProvider: "openai" | "google";
  ttsApiKey: string;
  ttsVoice: string;

  // Language settings
  nativeLang: string;
  learningLang: "ja" | "en";
  level: string;

  // Custom prompts
  analyzeSystemPrompt: string;
  handoutSystemPrompt: string;

  // Actions
  setAiProvider: (provider: "openai" | "gemini") => void;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  setTtsProvider: (provider: "openai" | "google") => void;
  setTtsApiKey: (key: string) => void;
  setTtsVoice: (voice: string) => void;
  setNativeLang: (lang: string) => void;
  setLearningLang: (lang: "ja" | "en") => void;
  setLevel: (level: string) => void;
  setAnalyzeSystemPrompt: (prompt: string) => void;
  setHandoutSystemPrompt: (prompt: string) => void;
}

export const OPENAI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
];

export const GEMINI_MODELS = [
  { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
  { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
];

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"];
export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const TTS_VOICES_OPENAI = [
  { value: "alloy", label: "Alloy" },
  { value: "echo", label: "Echo" },
  { value: "fable", label: "Fable" },
  { value: "onyx", label: "Onyx" },
  { value: "nova", label: "Nova" },
  { value: "shimmer", label: "Shimmer" },
];

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      aiProvider: "openai",
      apiKey: "",
      model: "gpt-4o-mini",

      ttsProvider: "openai",
      ttsApiKey: "",
      ttsVoice: "alloy",

      nativeLang: "zh-TW",
      learningLang: "ja",
      level: "N3",

      analyzeSystemPrompt: "",
      handoutSystemPrompt: "",

      setAiProvider: (provider) =>
        set({
          aiProvider: provider,
          model: provider === "openai" ? "gpt-4o-mini" : "gemini-2.0-flash",
        }),
      setApiKey: (key) => set({ apiKey: key }),
      setModel: (model) => set({ model }),
      setTtsProvider: (provider) => set({ ttsProvider: provider }),
      setTtsApiKey: (key) => set({ ttsApiKey: key }),
      setTtsVoice: (voice) => set({ ttsVoice: voice }),
      setNativeLang: (lang) => set({ nativeLang: lang }),
      setLearningLang: (lang) =>
        set({
          learningLang: lang,
          level: lang === "ja" ? "N3" : "B1",
        }),
      setLevel: (level) => set({ level }),
      setAnalyzeSystemPrompt: (prompt) => set({ analyzeSystemPrompt: prompt }),
      setHandoutSystemPrompt: (prompt) => set({ handoutSystemPrompt: prompt }),
    }),
    {
      name: "lang-heniiii-settings",
    }
  )
);
