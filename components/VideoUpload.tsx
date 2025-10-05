"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface VideoUploadProps {
  onUploadComplete: (videoUrl: string) => void;
}

export default function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("video", file);

      // Upload to our API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data.videoUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleYoutubeSubmit = async () => {
    if (!youtubeUrl.trim()) return;

    setIsUploading(true);

    try {
      const response = await fetch("/api/upload-youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      if (!response.ok) {
        throw new Error("YouTube upload failed");
      }

      const data = await response.json();
      onUploadComplete(data.videoUrl);
    } catch (error) {
      console.error("YouTube upload error:", error);
      alert("YouTube upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-2 border-dashed">
      <CardContent className="pt-6">
        {/* Method Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={uploadMethod === "file" ? "default" : "outline"}
            onClick={() => setUploadMethod("file")}
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <Button
            variant={uploadMethod === "url" ? "default" : "outline"}
            onClick={() => setUploadMethod("url")}
            className="flex-1"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            YouTube URL
          </Button>
        </div>

        {uploadMethod === "file" ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
              ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-lg font-medium">Uploading your video...</p>
                <p className="text-sm text-muted-foreground">This may take a moment</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-medium mb-1">
                    {isDragActive ? "Drop your video here" : "Drag & drop your video"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (MP4, MOV, AVI, MKV, WebM)
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">Max file size: 500MB</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                disabled={isUploading}
                className="flex-1"
              />
              <Button
                onClick={handleYoutubeSubmit}
                disabled={isUploading || !youtubeUrl.trim()}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              We'll download and process the video from YouTube
            </p>
          </div>
        )}

        {/* Demo Button */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Don't have a video? Try our demo
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onUploadComplete("demo")}
            disabled={isUploading}
          >
            Use Demo Video (Nike Ad)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
