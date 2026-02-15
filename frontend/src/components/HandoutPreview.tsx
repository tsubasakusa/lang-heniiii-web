"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getHandout } from "@/lib/api";
import { useSettingsStore } from "@/stores/settingsStore";
import { Download, FileText, Loader2 } from "lucide-react";

interface HandoutPreviewProps {
  analyzeData: Record<string, unknown>;
  vocabularyData: Record<string, unknown>;
  grammarData: Record<string, unknown>;
}

export function HandoutPreview({
  analyzeData,
  vocabularyData,
  grammarData,
}: HandoutPreviewProps) {
  const [title, setTitle] = useState("Language Study Handout");
  const [loading, setLoading] = useState<"pdf" | "html" | null>(null);
  const [error, setError] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const settings = useSettingsStore();

  const handleDownload = async (format: "pdf" | "html") => {
    setLoading(format);
    setError("");
    try {
      const blob = await getHandout({
        analyze_data: analyzeData,
        vocabulary_data: vocabularyData,
        grammar_data: grammarData,
        format,
        title,
        source_lang: settings.learningLang,
        target_lang: settings.nativeLang,
        level: settings.level,
      });

      if (format === "html") {
        const text = await blob.text();
        setPreviewHtml(text);
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `handout.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Handout Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Handout title"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-3">
            <Button onClick={() => handleDownload("pdf")} disabled={loading !== null}>
              {loading === "pdf" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDownload("html")}
              disabled={loading !== null}
            >
              {loading === "html" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Download HTML
            </Button>
          </div>
        </CardContent>
      </Card>

      {previewHtml && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              srcDoc={previewHtml}
              className="w-full h-[600px] border rounded-md"
              title="Handout Preview"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
