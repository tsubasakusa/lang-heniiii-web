"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GrammarPoint {
  pattern: string;
  explanation: string;
  level: string;
  example: string;
  example_translation: string;
}

interface GrammarSectionProps {
  grammarPoints: GrammarPoint[];
}

export function GrammarSection({ grammarPoints }: GrammarSectionProps) {
  return (
    <div className="space-y-4">
      {grammarPoints.map((point, idx) => (
        <Card key={idx}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg">{point.pattern}</CardTitle>
              {point.level && <Badge>{point.level}</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>{point.explanation}</p>
            {point.example && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">{point.example}</p>
                <p className="text-sm text-muted-foreground">{point.example_translation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
