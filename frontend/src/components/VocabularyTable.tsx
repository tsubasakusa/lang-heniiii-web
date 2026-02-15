"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/AudioPlayer";

interface Word {
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

interface VocabularyTableProps {
  words: Word[];
}

export function VocabularyTable({ words }: VocabularyTableProps) {
  return (
    <div className="space-y-3">
      {words.map((word, idx) => (
        <Card key={idx}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold">{word.word}</span>
                  {word.reading && (
                    <span className="text-muted-foreground">{word.reading}</span>
                  )}
                  <AudioPlayer text={word.word} size="sm" />
                </div>
                <div className="flex gap-2 mt-2">
                  {word.pos && <Badge variant="outline">{word.pos}</Badge>}
                  {word.level && <Badge>{word.level}</Badge>}
                </div>
                <p className="mt-2 text-lg">{word.meaning}</p>
                {(word.synonyms?.length || word.antonyms?.length) ? (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {word.synonyms?.length ? (
                      <span>Synonyms: {word.synonyms.join(", ")} </span>
                    ) : null}
                    {word.antonyms?.length ? (
                      <span>Antonyms: {word.antonyms.join(", ")}</span>
                    ) : null}
                  </div>
                ) : null}
                {word.example && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">{word.example}</p>
                    <p className="text-sm text-muted-foreground">{word.example_translation}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
