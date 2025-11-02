import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🔄 Journal API route called")

    // Fallback data
    console.log("📝 Returning journal entries")
    const entries = [
      {
        id: "fallback-1",
        title: "Building the Future",
        date: "Dec 20, 2024",
        excerpt:
          "Exploring the intersection of technology and human creativity. How AI tools are reshaping the way we build and create digital experiences.",
        category: "tech",
        status: "published",
        tags: ["AI", "development", "future"],
        lastEdited: new Date().toISOString(),
      },
      {
        id: "fallback-2",
        title: "Leadership in Remote Teams",
        date: "Dec 15, 2024",
        excerpt:
          "Lessons learned from leading distributed teams across different time zones. The importance of clear communication and trust in virtual environments.",
        category: "leadership",
        status: "published",
        tags: ["remote work", "leadership", "teams"],
        lastEdited: new Date().toISOString(),
      },
      {
        id: "fallback-3",
        title: "The Art of Problem Solving",
        date: "Dec 10, 2024",
        excerpt:
          "Every complex problem has a simple solution waiting to be discovered. My approach to breaking down challenges and finding elegant solutions.",
        category: "creative",
        status: "published",
        tags: ["problem solving", "creativity", "methodology"],
        lastEdited: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      entries: entries,
      count: entries.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Journal API error:", error)

    return NextResponse.json({
      entries: [],
      count: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
