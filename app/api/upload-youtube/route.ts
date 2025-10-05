import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "No URL provided" },
        { status: 400 }
      );
    }

    // For now, we'll just return the YouTube URL
    // In production, you'd use yt-dlp or similar to download the video
    // For hackathon demo, we can work with the URL directly

    return NextResponse.json({
      success: true,
      videoUrl: url,
      source: "youtube",
    });
  } catch (error) {
    console.error("YouTube upload error:", error);
    return NextResponse.json(
      { error: "YouTube upload failed" },
      { status: 500 }
    );
  }
}
