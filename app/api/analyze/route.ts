import { NextRequest, NextResponse } from "next/server";

// TwelveLabs API integration
async function analyzeTwelveLabs(videoUrl: string) {
  const apiKey = process.env.TWELVELABS_API_KEY;

  if (!apiKey) {
    throw new Error("TwelveLabs API key not configured");
  }

  try {
    // Step 1: Create an index (if not exists)
    // Step 2: Upload video to TwelveLabs
    const uploadResponse = await fetch("https://api.twelvelabs.io/v1.2/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        index_id: process.env.TWELVELABS_INDEX_ID || "default",
        video_url: videoUrl,
        language: "en",
      }),
    });

    if (!uploadResponse.ok) {
      throw new Error("TwelveLabs upload failed");
    }

    const uploadData = await uploadResponse.json();
    const taskId = uploadData._id;

    // Step 3: Wait for processing (poll status)
    let processed = false;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    while (!processed && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

      const statusResponse = await fetch(
        `https://api.twelvelabs.io/v1.2/tasks/${taskId}`,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      const statusData = await statusResponse.json();

      if (statusData.status === "ready") {
        processed = true;
      } else if (statusData.status === "failed") {
        throw new Error("TwelveLabs processing failed");
      }

      attempts++;
    }

    if (!processed) {
      throw new Error("TwelveLabs processing timeout");
    }

    // Step 4: Get video analysis
    const videoId = uploadData.video_id;

    // Get scene detection
    const scenesResponse = await fetch(
      `https://api.twelvelabs.io/v1.2/indexes/${process.env.TWELVELABS_INDEX_ID}/videos/${videoId}/segments`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    const scenesData = await scenesResponse.json();

    // Get transcription
    const transcriptResponse = await fetch(
      `https://api.twelvelabs.io/v1.2/indexes/${process.env.TWELVELABS_INDEX_ID}/videos/${videoId}/transcription`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    const transcriptData = await transcriptResponse.json();

    return {
      scenes: scenesData.data || [],
      transcript: transcriptData.data || [],
      videoId,
    };
  } catch (error) {
    console.error("TwelveLabs error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: "No video URL provided" },
        { status: 400 }
      );
    }

    // For demo purposes, return mock data if API key not set
    if (!process.env.TWELVELABS_API_KEY) {
      console.log("TwelveLabs API key not set, returning mock data for:", videoUrl);
      
      // Generate different mock text based on URL
      let mockText = "You can't stop us. Together we rise. This is more than sport. This is unity.";
      
      if (videoUrl.includes("apple") || videoUrl.toLowerCase().includes("iphone")) {
        mockText = "Think different. Innovation that changes everything. The future is here.";
      } else if (videoUrl.includes("coca") || videoUrl.includes("coke")) {
        mockText = "Taste the feeling. Open happiness. Share a Coke with the world.";
      } else if (videoUrl.includes("pepsi")) {
        mockText = "For the love of it. That's what I like. Pepsi generation.";
      } else if (videoUrl.includes("adidas")) {
        mockText = "Impossible is nothing. All in or nothing. Create the new.";
      } else if (videoUrl.includes("mcdon")) {
        mockText = "I'm lovin' it. Good times great taste. You deserve a break today.";
      } else if (videoUrl.includes("toyota")) {
        mockText = "Let's go places. Built for the way you live. The best built cars in the world.";
      } else if (videoUrl.includes("samsung")) {
        mockText = "Do what you can't. Next is now. Designed for humans.";
      }
      
      return NextResponse.json({
        success: true,
        analysis: {
          scenes: [
            {
              start: 0,
              end: 15,
              description: "Athletes training intensely, diverse group showing determination",
              emotions: ["determination", "focus", "intensity"],
              objects: ["sports equipment", "gym", "athletes", "weights"],
            },
            {
              start: 15,
              end: 30,
              description: "Emotional triumph moment with celebration and joy",
              emotions: ["joy", "triumph", "inspiration"],
              objects: ["trophy", "crowd", "celebration", "confetti"],
            },
            {
              start: 30,
              end: 45,
              description: "Product showcase with prominent brand logo display",
              emotions: ["confidence", "aspiration", "pride"],
              objects: ["product", "logo", "lifestyle", "brand"],
            },
          ],
          voiceover: {
            text: mockText,
            language: "en-US",
            emotion: "inspirational",
          },
          visualElements: {
            colors: ["#000000", "#FFFFFF", "#FF6B00", "#1E90FF"],
            brandMoments: [5, 23, 38, 42],
            textOverlays: ["You Can't Stop Us", "Together We Rise", "Just Do It"],
          },
        },
      });
    }

    // Use real TwelveLabs API
    const result = await analyzeTwelveLabs(videoUrl);

    // Transform TwelveLabs data to our format
    const analysis = {
      scenes: result.scenes.map((scene: any) => ({
        start: scene.start,
        end: scene.end,
        description: scene.metadata?.text || "Scene description",
        emotions: scene.metadata?.emotions || [],
        objects: scene.metadata?.objects || [],
      })),
      voiceover: {
        text: result.transcript.map((t: any) => t.value).join(" "),
        language: "en-US",
        emotion: "neutral",
      },
      visualElements: {
        colors: ["#000000", "#FFFFFF"],
        brandMoments: [],
        textOverlays: [],
      },
    };

    return NextResponse.json({
      success: true,
      analysis,
      videoId: result.videoId,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
