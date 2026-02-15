"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { VocabularyTable } from "@/components/VocabularyTable";

interface WordData {
  word: string;
  reading: string;
  pos: string;
  meaning: string;
  level: string;
  synonyms?: string[];
  antonyms?: string[];
  example: string;
  example_translation: string;
}

interface VocabularyData {
  words: WordData[];
}

export default function VocabularyPage() {
  const [data, setData] = useState<VocabularyData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("vocabularyData");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Vocabulary</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              No vocabulary data available. Please go to the{" "}
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
      <h1 className="text-3xl font-bold tracking-tight">Vocabulary List</h1>
      <p className="text-muted-foreground">
        {data.words.length} words extracted from the text.
      </p>
      <VocabularyTable words={data.words} />
    </div>
  );
}
