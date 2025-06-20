import { NextResponse } from "next/server"
import { getNowPlaying } from "@/lib/spotify"

export async function GET() {
  try {
    const response = await getNowPlaying()

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    })
  } catch (error) {
    console.error("Spotify API error:", error)
    return NextResponse.json({ isPlaying: false, error: "Failed to fetch now playing" }, { status: 500 })
  }
}
