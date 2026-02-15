"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/AudioPlayer";

interface Word {
  word: string;
  reading: string;
  pos: string;
  meaning: string;
  level: string;
}

interface Sentence {
  original: string;
  translation: string;
  words?: Word[];
}

interface AnalyzeViewProps {
  sentences: Sentence[];
}

export function AnalyzeView({ sentences }: AnalyzeViewProps) {
  return (
    <div className="space-y-4">
      {sentences.map((sentence, idx) => (
        <Card key={idx}>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-lg font-medium">{sentence.original}</p>
                <p className="text-muted-foreground mt-1">{sentence.translation}</p>
              </div>
              <AudioPlayer text={sentence.original} size="sm" />
            </div>
            {sentence.words && sentence.words.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                {sentence.words.map((word, widx) => (
                  <div
                    key={widx}
                    className="group relative inline-flex items-center gap-1"
                  >
                    <Badge variant="secondary" className="cursor-help">
                      {word.word}
                      {word.reading && (
                        <span className="ml-1 text-xs opacity-70">
                          ({word.reading})
                        </span>
                      )}
                    </Badge>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                      <div className="rounded-md bg-popover p-3 text-sm shadow-lg border min-w-[200px]">
                        <p className="font-medium">{word.word}</p>
                        {word.reading && <p className="text-xs text-muted-foreground">{word.reading}</p>}
                        <p className="mt-1">{word.meaning}</p>
                        <div className="flex gap-2 mt-1">
                          {word.pos && <Badge variant="outline" className="text-xs">{word.pos}</Badge>}
                          {word.level && <Badge variant="outline" className="text-xs">{word.level}</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
