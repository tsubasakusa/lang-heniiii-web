"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettingsStore } from "@/stores/settingsStore";
import { analyzeText, getVocabulary, getGrammar } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const settings = useSettingsStore();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    if (!settings.apiKey) {
      setError("Please set your API key in Settings first.");
      return;
    }

    setLoading(true);
    setError("");

    const requestOptions = {
      text: text.trim(),
      api_key: settings.apiKey,
      model: settings.model,
      provider: settings.aiProvider,
      source_lang: settings.learningLang,
      target_lang: settings.nativeLang,
      level: settings.level,
      system_prompt: settings.analyzeSystemPrompt || undefined,
    };

    try {
      const [analyzeData, vocabData, grammarData] = await Promise.all([
        analyzeText(requestOptions),
        getVocabulary(requestOptions),
        getGrammar(requestOptions),
      ]);

      // Store results in sessionStorage for other pages
      sessionStorage.setItem("analyzeData", JSON.stringify(analyzeData));
      sessionStorage.setItem("vocabularyData", JSON.stringify(vocabData));
      sessionStorage.setItem("grammarData", JSON.stringify(grammarData));
      sessionStorage.setItem("originalText", text.trim());

      router.push("/analyze");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please check your settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Language Learning Tool</h1>
        <p className="text-muted-foreground mt-2">
          Paste a text in {settings.learningLang === "ja" ? "Japanese" : "English"} to get
          sentence-by-sentence translation, vocabulary list, and grammar analysis.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>
            Paste the text you want to study. Current level: {settings.level} |
            Provider: {settings.aiProvider} | Model: {settings.model}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={
              settings.learningLang === "ja"
                ? "ここに日本語のテキストを貼り付けてください..."
                : "Paste your English text here..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="resize-y"
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="flex gap-3">
            <Button onClick={handleAnalyze} disabled={loading} size="lg">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Analyzing..." : "Analyze Text"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setText("")}
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {!settings.apiKey && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              You haven&apos;t set an API key yet.{" "}
              <a href="/settings" className="font-medium underline">
                Go to Settings
              </a>{" "}
              to configure your AI provider and API key.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
