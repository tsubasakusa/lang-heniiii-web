"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GrammarSection } from "@/components/GrammarSection";

interface GrammarPointData {
  pattern: string;
  explanation: string;
  level: string;
  example: string;
  example_translation: string;
}

interface GrammarData {
  grammar_points: GrammarPointData[];
}

export default function GrammarPage() {
  const [data, setData] = useState<GrammarData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("grammarData");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Grammar</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              No grammar data available. Please go to the{" "}
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
      <h1 className="text-3xl font-bold tracking-tight">Grammar Analysis</h1>
      <p className="text-muted-foreground">
        {data.grammar_points.length} grammar points found.
      </p>
      <GrammarSection grammarPoints={data.grammar_points} />
    </div>
  );
}
