"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AnalyzeView } from "@/components/AnalyzeView";
import { AudioPlayer } from "@/components/AudioPlayer";

interface SentenceData {
  original: string;
  translation: string;
  words?: Array<{
    word: string;
    reading: string;
    pos: string;
    meaning: string;
    level: string;
  }>;
}

interface AnalyzeData {
  sentences: SentenceData[];
}

export default function AnalyzePage() {
  const [data, setData] = useState<AnalyzeData | null>(null);
  const [originalText, setOriginalText] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("analyzeData");
    const text = sessionStorage.getItem("originalText");
    if (stored) setData(JSON.parse(stored));
    if (text) setOriginalText(text);
  }, []);

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Analysis</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              No analysis data available. Please go to the{" "}
              <a href="/" className="text-primary underline">
                home page
              </a>{" "}
              and submit text for analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Sentence Analysis</h1>
        <AudioPlayer text={originalText} />
      </div>
      <AnalyzeView sentences={data.sentences} />
    </div>
  );
}
