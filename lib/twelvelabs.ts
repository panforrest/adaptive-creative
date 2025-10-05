// TwelveLabs API Client

const TWELVELABS_API_URL = "https://api.twelvelabs.io/v1.2";

export interface TwelveLabsConfig {
  apiKey: string;
  indexId?: string;
}

export class TwelveLabsClient {
  private apiKey: string;
  private indexId: string;

  constructor(config: TwelveLabsConfig) {
    this.apiKey = config.apiKey;
    this.indexId = config.indexId || "";
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${TWELVELABS_API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`TwelveLabs API error: ${error}`);
    }

    return response.json();
  }

  async createIndex(name: string, engines: string[] = ["marengo2.6"]) {
    return this.request("/indexes", {
      method: "POST",
      body: JSON.stringify({
        index_name: name,
        engines: engines.map(engine => ({
          engine_name: engine,
          engine_options: ["visual", "conversation", "text_in_video", "logo"],
        })),
      }),
    });
  }

  async uploadVideo(videoUrl: string, indexId?: string) {
    const targetIndexId = indexId || this.indexId;

    return this.request("/tasks", {
      method: "POST",
      body: JSON.stringify({
        index_id: targetIndexId,
        video_url: videoUrl,
        language: "en",
      }),
    });
  }

  async getTaskStatus(taskId: string) {
    return this.request(`/tasks/${taskId}`);
  }

  async waitForTask(taskId: string, maxWaitMs: number = 300000) {
    const startTime = Date.now();
    const pollInterval = 5000; // 5 seconds

    while (Date.now() - startTime < maxWaitMs) {
      const status = await this.getTaskStatus(taskId);

      if (status.status === "ready") {
        return status;
      }

      if (status.status === "failed") {
        throw new Error("Task failed: " + status.error_message);
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error("Task timeout");
  }

  async getVideoSegments(videoId: string, indexId?: string) {
    const targetIndexId = indexId || this.indexId;
    return this.request(`/indexes/${targetIndexId}/videos/${videoId}/segments`);
  }

  async getVideoTranscription(videoId: string, indexId?: string) {
    const targetIndexId = indexId || this.indexId;
    return this.request(`/indexes/${targetIndexId}/videos/${videoId}/transcription`);
  }

  async searchVideo(query: string, indexId?: string) {
    const targetIndexId = indexId || this.indexId;
    return this.request(`/indexes/${targetIndexId}/search`, {
      method: "POST",
      body: JSON.stringify({
        query,
        search_options: ["visual", "conversation", "text_in_video"],
      }),
    });
  }

  async analyzeVideo(videoUrl: string) {
    // Upload video
    const uploadResult = await this.uploadVideo(videoUrl);
    const taskId = uploadResult._id;

    // Wait for processing
    const taskResult = await this.waitForTask(taskId);
    const videoId = taskResult.video_id;

    // Get analysis data
    const [segments, transcription] = await Promise.all([
      this.getVideoSegments(videoId),
      this.getVideoTranscription(videoId),
    ]);

    return {
      videoId,
      segments: segments.data || [],
      transcription: transcription.data || [],
    };
  }
}

export function createTwelveLabsClient(apiKey?: string, indexId?: string) {
  const key = apiKey || process.env.TWELVELABS_API_KEY;
  const index = indexId || process.env.TWELVELABS_INDEX_ID;

  if (!key) {
    throw new Error("TwelveLabs API key not configured");
  }

  return new TwelveLabsClient({ apiKey: key, indexId: index });
}
