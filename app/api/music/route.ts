import { getAllMarkdownFiles } from "@/lib/markdown";
import type { MusicContent } from "@/types/content";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const musicData = await getAllMarkdownFiles<MusicContent>("music");
    return NextResponse.json(musicData);
  } catch (error) {
    console.error("Error fetching music data:", error);
    return NextResponse.json(
      { error: "Failed to fetch music data" },
      { status: 500 }
    );
  }
}
