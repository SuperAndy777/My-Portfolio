import { NextResponse } from "next/server"
import { getJournalEntries } from "@/lib/notion"

export async function GET() {
  try {
    console.log("🔄 Journal API route called")

    // Try to fetch from Notion
    const notionEntries = await getJournalEntries()

    if (notionEntries.length > 0) {
      console.log(`✅ Returning ${notionEntries.length} entries from Notion`)
      return NextResponse.json({
        entries: notionEntries,
        count: notionEntries.length,
        timestamp: new Date().toISOString(),
        source: "notion",
      })
    }

    // Fallback data if Notion fails or has no entries
    console.log("📝 Returning fallback journal entries")
    const fallbackEntries = [
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
      entries: fallbackEntries,
      count: fallbackEntries.length,
      timestamp: new Date().toISOString(),
      source: "fallback",
    })
  } catch (error) {
    console.error("❌ Journal API error:", error)

    // Even on error, return fallback data
    const errorFallback = [
      {
        id: "error-fallback",
        title: "System Maintenance",
        date: "Dec 25, 2024",
        excerpt:
          "The journal system is currently undergoing maintenance. Please check back soon for the latest updates and insights.",
        category: "tech",
        status: "published",
        tags: ["maintenance", "system"],
        lastEdited: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      entries: errorFallback,
      count: errorFallback.length,
      timestamp: new Date().toISOString(),
      source: "fallback",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
