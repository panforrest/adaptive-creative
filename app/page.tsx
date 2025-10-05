"use client";

import { useState } from "react";
import { Upload, Globe, Zap, TrendingUp, Video, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VideoUpload from "@/components/VideoUpload";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleVideoUpload = (videoUrl: string) => {
    setUploadedVideo(videoUrl);
    setShowDashboard(true);
  };

  if (showDashboard && uploadedVideo) {
    return <Dashboard videoUrl={uploadedVideo} onBack={() => setShowDashboard(false)} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AdaptiveCreative
              </h1>
              <p className="text-xs text-muted-foreground">Multi-Market Auto-Optimizer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Advertising Week NYC 2025</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            🏆 Content Velocity Engine - Challenge 1
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            One Ad.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Market.
            </span>{" "}
            Instantly.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your master ad into 50 culturally-adapted market variants in under 10 minutes.
            Save 99% of time and cost with AI-powered localization.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-600">99.8%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-muted-foreground">Markets</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-green-600">10min</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-orange-600">29</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <VideoUpload onUploadComplete={handleVideoUpload} />
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Powered by Enterprise AI</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <Video className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>TwelveLabs</CardTitle>
                <CardDescription>
                  Advanced video understanding to analyze scenes, objects, emotions, and creative elements
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Languages className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>ElevenLabs</CardTitle>
                <CardDescription>
                  Voice cloning and emotion-matched dubbing in 29 languages with cultural nuance
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-green-500 transition-colors">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>AWS + Swayable</CardTitle>
                <CardDescription>
                  Cultural intelligence and persuasion scoring to optimize for each market
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl my-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Upload Your Master Ad</h4>
                <p className="text-muted-foreground">
                  Drop your video file or paste a YouTube URL. We support all major formats.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">AI Analyzes Creative Elements</h4>
                <p className="text-muted-foreground">
                  TwelveLabs breaks down scenes, music, voiceover, text, products, and emotional beats.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Select Target Markets</h4>
                <p className="text-muted-foreground">
                  Choose from 50+ markets. Our cultural engine adapts visuals, audio, and messaging.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Generate & Download Variants</h4>
                <p className="text-muted-foreground">
                  Get market-ready variants with localized voiceovers, cultural adaptations, and persuasion scores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for Advertising Week NYC 2025 | Generative AI in Advertising Hackathon</p>
          <p className="mt-2">Powered by TwelveLabs • ElevenLabs • AWS Bedrock • Swayable</p>
        </div>
      </footer>
    </main>
  );
}
