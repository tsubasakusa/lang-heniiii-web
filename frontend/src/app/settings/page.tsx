"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useSettingsStore,
  OPENAI_MODELS,
  GEMINI_MODELS,
  JLPT_LEVELS,
  CEFR_LEVELS,
  TTS_VOICES_OPENAI,
} from "@/stores/settingsStore";
import { healthCheck } from "@/lib/api";
import { useState } from "react";

export default function SettingsPage() {
  const settings = useSettingsStore();
  const [backendStatus, setBackendStatus] = useState<"unknown" | "ok" | "error">("unknown");

  const models = settings.aiProvider === "openai" ? OPENAI_MODELS : GEMINI_MODELS;
  const levels = settings.learningLang === "ja" ? JLPT_LEVELS : CEFR_LEVELS;

  const checkBackend = async () => {
    const ok = await healthCheck();
    setBackendStatus(ok ? "ok" : "error");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your AI provider, language preferences, and custom prompts.
        </p>
      </div>

      {/* Backend Status */}
      <Card>
        <CardHeader>
          <CardTitle>Backend Status</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Button variant="outline" onClick={checkBackend}>
            Check Connection
          </Button>
          {backendStatus === "ok" && (
            <span className="text-sm text-green-600">Connected</span>
          )}
          {backendStatus === "error" && (
            <span className="text-sm text-destructive">
              Cannot connect to backend. Make sure it&apos;s running on port 8000.
            </span>
          )}
        </CardContent>
      </Card>

      {/* AI Provider */}
      <Card>
        <CardHeader>
          <CardTitle>AI Provider</CardTitle>
          <CardDescription>Select your AI provider and enter your API key.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Provider</Label>
            <Select value={settings.aiProvider} onValueChange={(v) => settings.setAiProvider(v as "openai" | "gemini")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="gemini">Google Gemini</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>API Key</Label>
            <Input
              type="password"
              placeholder="Enter your API key"
              value={settings.apiKey}
              onChange={(e) => settings.setApiKey(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Model</Label>
            <Select value={settings.model} onValueChange={settings.setModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* TTS Provider */}
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech</CardTitle>
          <CardDescription>Configure TTS for audio playback.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>TTS Provider</Label>
            <Select value={settings.ttsProvider} onValueChange={(v) => settings.setTtsProvider(v as "openai" | "google")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI TTS</SelectItem>
                <SelectItem value="google">Google Cloud TTS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>TTS API Key</Label>
            <Input
              type="password"
              placeholder="Leave empty to use the same API key as above"
              value={settings.ttsApiKey}
              onChange={(e) => settings.setTtsApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              If empty, the main API key will be used.
            </p>
          </div>
          {settings.ttsProvider === "openai" && (
            <div className="grid gap-2">
              <Label>Voice</Label>
              <Select value={settings.ttsVoice} onValueChange={settings.setTtsVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TTS_VOICES_OPENAI.map((v) => (
                    <SelectItem key={v.value} value={v.value}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Set your native and target language.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Native Language</Label>
            <Select value={settings.nativeLang} onValueChange={settings.setNativeLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh-TW">Traditional Chinese</SelectItem>
                <SelectItem value="zh-CN">Simplified Chinese</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Learning Language</Label>
            <Select value={settings.learningLang} onValueChange={(v) => settings.setLearningLang(v as "ja" | "en")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Level</Label>
            <Select value={settings.level} onValueChange={settings.setLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Custom Prompts */}
      <Card>
        <CardHeader>
          <CardTitle>Custom System Prompts</CardTitle>
          <CardDescription>
            Override the default prompts sent to the AI. Leave empty to use defaults.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Analysis System Prompt</Label>
            <Textarea
              placeholder="Custom system prompt for analysis (optional)"
              value={settings.analyzeSystemPrompt}
              onChange={(e) => settings.setAnalyzeSystemPrompt(e.target.value)}
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label>Handout System Prompt</Label>
            <Textarea
              placeholder="Custom system prompt for handout generation (optional)"
              value={settings.handoutSystemPrompt}
              onChange={(e) => settings.setHandoutSystemPrompt(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
