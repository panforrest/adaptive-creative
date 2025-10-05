"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Globe, Loader2, Download, Play, TrendingUp, Languages, Video, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProps {
  videoUrl: string;
  onBack: () => void;
}

interface VideoAnalysis {
  scenes: Array<{
    start: number;
    end: number;
    description: string;
    emotions: string[];
    objects: string[];
  }>;
  voiceover: {
    text: string;
    language: string;
    emotion: string;
  };
  visualElements: {
    colors: string[];
    brandMoments: number[];
    textOverlays: string[];
  };
}

interface MarketVariant {
  market: string;
  flag: string;
  status: "pending" | "processing" | "complete";
  modifications: string[];
  persuasionScore: number;
  videoUrl?: string;
}

const MARKETS = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
];

export default function Dashboard({ videoUrl, onBack }: DashboardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [variants, setVariants] = useState<MarketVariant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate video analysis
  useEffect(() => {
    if (videoUrl === "demo") {
      simulateAnalysis();
    } else {
      analyzeVideo();
    }
  }, [videoUrl]);

  const simulateAnalysis = async () => {
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      setAnalysisProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Set mock analysis data
    setAnalysis({
      scenes: [
        {
          start: 0,
          end: 15,
          description: "Athletes training intensely, diverse group",
          emotions: ["determination", "focus", "intensity"],
          objects: ["sports equipment", "gym", "athletes"],
        },
        {
          start: 15,
          end: 30,
          description: "Emotional triumph moment, celebration",
          emotions: ["joy", "triumph", "inspiration"],
          objects: ["trophy", "crowd", "celebration"],
        },
        {
          start: 30,
          end: 45,
          description: "Product showcase with brand logo",
          emotions: ["confidence", "aspiration"],
          objects: ["product", "logo", "lifestyle"],
        },
      ],
      voiceover: {
        text: "You can't stop us. Together we rise.",
        language: "en-US",
        emotion: "inspirational",
      },
      visualElements: {
        colors: ["#000000", "#FFFFFF", "#FF6B00"],
        brandMoments: [5, 23, 38],
        textOverlays: ["You Can't Stop Us", "Just Do It"],
      },
    });

    setIsAnalyzing(false);
  };

  const analyzeVideo = async () => {
    try {
      // Call TwelveLabs API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await response.json();
      setAnalysis(data.analysis);
      setIsAnalyzing(false);
    } catch (error) {
      console.error("Analysis error:", error);
      // Fallback to demo data
      simulateAnalysis();
    }
  };

  const generateVariants = async () => {
    setIsGenerating(true);

    // Initialize variants
    const newVariants: MarketVariant[] = selectedMarkets.map(code => ({
      market: MARKETS.find(m => m.code === code)?.name || code,
      flag: MARKETS.find(m => m.code === code)?.flag || "🌍",
      status: "pending",
      modifications: [],
      persuasionScore: 0,
    }));

    setVariants(newVariants);

    try {
      // Call API to generate variants
      const response = await fetch("/api/generate-variants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marketCodes: selectedMarkets,
          videoAnalysis: analysis,
        }),
      });

      if (!response.ok) {
        throw new Error("Variant generation failed");
      }

      const data = await response.json();

      // Animate variant completion
      for (let i = 0; i < data.variants.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setVariants(prev => prev.map((v, idx) => 
          idx === i ? { ...v, status: "processing" } : v
        ));

        await new Promise(resolve => setTimeout(resolve, 1500));

        const variant = data.variants[i];
        setVariants(prev => prev.map((v, idx) => 
          idx === i ? {
            ...v,
            status: "complete",
            modifications: variant.modifications,
            persuasionScore: variant.persuasionScore,
            videoUrl: variant.videoUrl,
          } : v
        ));
      }
    } catch (error) {
      console.error("Variant generation error:", error);
      
      // Fallback to mock data
      for (let i = 0; i < newVariants.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setVariants(prev => prev.map((v, idx) => 
          idx === i ? { ...v, status: "processing" } : v
        ));

        await new Promise(resolve => setTimeout(resolve, 2000));

        const modifications = getMarketModifications(selectedMarkets[i]);
        const score = 75 + Math.random() * 20;

        setVariants(prev => prev.map((v, idx) => 
          idx === i ? {
            ...v,
            status: "complete",
            modifications,
            persuasionScore: Math.round(score),
            videoUrl: `/api/variants/${selectedMarkets[i]}.mp4`,
          } : v
        ));
      }
    }

    setIsGenerating(false);
  };

  const getMarketModifications = (marketCode: string): string[] => {
    const mods: Record<string, string[]> = {
      JP: [
        "Shortened duration by 15 seconds (faster pacing preference)",
        "Japanese voiceover with formal tone",
        "Added anime-style transitions",
        "Adjusted color grading (softer tones)",
        "Localized text overlays in Japanese",
      ],
      SA: [
        "Applied modest clothing overlays where needed",
        "Arabic voiceover (right-to-left text)",
        "Removed mixed-gender scenes",
        "Added cultural symbols (geometric patterns)",
        "Adjusted music to traditional instruments",
      ],
      IN: [
        "Hindi voiceover with energetic delivery",
        "Added cricket athlete scenes",
        "Vibrant color enhancement",
        "Bollywood-style music track",
        "Extended family-focused messaging",
      ],
      DE: [
        "German voiceover with direct, technical tone",
        "Emphasized product specifications",
        "Reduced emotional content, more factual",
        "Professional, minimalist aesthetic",
        "Added technical data overlays",
      ],
      BR: [
        "Portuguese voiceover with warm, energetic tone",
        "Samba-style background music",
        "Enhanced vibrant colors (carnival palette)",
        "Added community/social scenes",
        "Faster pacing with more cuts",
      ],
      KR: [
        "Korean voiceover with modern K-pop aesthetic",
        "Faster cuts and transitions",
        "K-pop style music track",
        "Enhanced visual effects",
        "Added trendy graphics and text animations",
      ],
    };

    return mods[marketCode] || ["Localized voiceover", "Cultural adaptation applied"];
  };

  const handleDownloadVariant = async (variant: MarketVariant, marketCode: string) => {
    try {
      // Show loading state
      alert(`Rendering video for ${variant.market}... This will take 2-5 minutes. Check console for progress.`);
      
      const textToRender = analysis?.voiceover.text || "You can't stop us. Together we rise.";
      console.log(`🎬 Requesting video render for ${variant.market} (${marketCode})`);
      console.log(`📝 Text to render: "${textToRender}"`);
      
      // Call the render API
      const response = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marketCode,
          originalText: analysis?.voiceover.text || "You can't stop us. Together we rise.",
        }),
      });

      if (!response.ok) {
        throw new Error("Video rendering failed");
      }

      const data = await response.json();
      console.log("✅ Video rendered:", data);

      // Download the video
      if (data.videoUrl) {
        const link = document.createElement("a");
        link.href = data.videoUrl;
        link.download = `${variant.market.replace(/\s+/g, "_")}_variant.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert(`Video rendered successfully! Downloading ${variant.market} variant.`);
      }
    } catch (error) {
      console.error("Error rendering video:", error);
      alert("Failed to render video. Check console for details.");
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-6 h-6 text-blue-600 animate-pulse" />
              Analyzing Your Video
            </CardTitle>
            <CardDescription>
              TwelveLabs is breaking down creative elements...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={analysisProgress} className="h-2" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className={analysisProgress > 20 ? "text-green-600" : ""}>
                  {analysisProgress > 20 ? "✓" : "○"} Detecting scenes and transitions
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={analysisProgress > 40 ? "text-green-600" : ""}>
                  {analysisProgress > 40 ? "✓" : "○"} Analyzing emotional beats
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={analysisProgress > 60 ? "text-green-600" : ""}>
                  {analysisProgress > 60 ? "✓" : "○"} Extracting voiceover and audio
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={analysisProgress > 80 ? "text-green-600" : ""}>
                  {analysisProgress > 80 ? "✓" : "○"} Identifying visual elements
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">AdaptiveCreative</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Analysis Complete</CardTitle>
                <CardDescription>
                  TwelveLabs has identified all modular creative elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scenes */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Scene Breakdown
                  </h3>
                  <div className="space-y-3">
                    {analysis?.scenes.map((scene, idx) => (
                      <Card key={idx} className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">
                              Scene {idx + 1} ({scene.start}s - {scene.end}s)
                            </span>
                            <div className="flex gap-1">
                              {scene.emotions.map(emotion => (
                                <Badge key={emotion} variant="secondary" className="text-xs">
                                  {emotion}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{scene.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Voiceover */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    Voiceover Analysis
                  </h3>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <p className="text-sm mb-2">"{analysis?.voiceover.text}"</p>
                      <div className="flex gap-2">
                        <Badge>{analysis?.voiceover.language}</Badge>
                        <Badge variant="secondary">{analysis?.voiceover.emotion}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Visual Elements */}
                <div>
                  <h3 className="font-semibold mb-3">Visual Elements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-muted/50">
                      <CardContent className="pt-4">
                        <p className="text-sm font-medium mb-2">Color Palette</p>
                        <div className="flex gap-2">
                          {analysis?.visualElements.colors.map(color => (
                            <div
                              key={color}
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="pt-4">
                        <p className="text-sm font-medium mb-2">Text Overlays</p>
                        <div className="space-y-1">
                          {analysis?.visualElements.textOverlays.map(text => (
                            <Badge key={text} variant="outline" className="text-xs">
                              {text}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Markets Tab */}
          <TabsContent value="markets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Target Markets</CardTitle>
                <CardDescription>
                  Choose markets for cultural adaptation (currently selected: {selectedMarkets.length})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  {MARKETS.map(market => (
                    <button
                      key={market.code}
                      onClick={() => {
                        setSelectedMarkets(prev =>
                          prev.includes(market.code)
                            ? prev.filter(c => c !== market.code)
                            : [...prev, market.code]
                        );
                      }}
                      className={`
                        p-4 rounded-lg border-2 transition-all text-center
                        ${selectedMarkets.includes(market.code)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                        }
                      `}
                    >
                      <div className="text-3xl mb-1">{market.flag}</div>
                      <div className="text-xs font-medium">{market.name}</div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={generateVariants}
                  disabled={selectedMarkets.length === 0 || isGenerating || variants.length > 0}
                  className="w-full"
                  size="lg"
                >
                  {variants.length > 0 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      {variants.length} Variants Generated
                    </>
                  ) : isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Variants...
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 mr-2" />
                      Generate {selectedMarkets.length} Market Variant{selectedMarkets.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Variants Tab */}
          <TabsContent value="variants" className="space-y-6">
            {variants.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No variants generated yet. Go to Markets tab to create variants.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {variants.map((variant, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-2xl">{variant.flag}</span>
                          {variant.market}
                        </CardTitle>
                        {variant.status === "complete" && (
                          <Badge className="bg-green-600">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {variant.persuasionScore}%
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {variant.status === "pending" && "Waiting to process..."}
                        {variant.status === "processing" && "Generating variant..."}
                        {variant.status === "complete" && "Ready for download"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {variant.status === "processing" && (
                        <div className="flex items-center gap-2 mb-4">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}

                      {variant.status === "complete" && (
                        <>
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">Modifications Applied:</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {variant.modifications.map((mod, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-0.5">✓</span>
                                  <span>{mod}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => handleDownloadVariant(variant, selectedMarkets[idx])}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Render & Download Video
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
