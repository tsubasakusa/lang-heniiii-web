"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HandoutPreview } from "@/components/HandoutPreview";

export default function HandoutPage() {
  const [analyzeData, setAnalyzeData] = useState<Record<string, unknown> | null>(null);
  const [vocabularyData, setVocabularyData] = useState<Record<string, unknown> | null>(null);
  const [grammarData, setGrammarData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const a = sessionStorage.getItem("analyzeData");
    const v = sessionStorage.getItem("vocabularyData");
    const g = sessionStorage.getItem("grammarData");
    if (a) setAnalyzeData(JSON.parse(a));
    if (v) setVocabularyData(JSON.parse(v));
    if (g) setGrammarData(JSON.parse(g));
  }, []);

  if (!analyzeData || !vocabularyData || !grammarData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Handout</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              No data available for handout generation. Please go to the{" "}
              <a href="/" className="text-primary underline">
                home page
              </a>{" "}
              and submit text for analysis first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Study Handout</h1>
      <p className="text-muted-foreground">
        Download a study handout as PDF or HTML.
      </p>
      <HandoutPreview
        analyzeData={analyzeData}
        vocabularyData={vocabularyData}
        grammarData={grammarData}
      />
    </div>
  );
}
