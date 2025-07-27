import { NextResponse } from "next/server"
import { testNotionConnection } from "@/lib/notion"

export async function GET() {
  try {
    console.log("🧪 Testing Notion connection...")

    const testResult = await testNotionConnection()

    return NextResponse.json({
      ...testResult,
      timestamp: new Date().toISOString(),
      environment: {
        hasToken: !!process.env.NOTION_TOKEN,
        hasDatabaseId: !!process.env.NOTION_DATABASE_ID,
        tokenPrefix: process.env.NOTION_TOKEN ? process.env.NOTION_TOKEN.substring(0, 10) + "..." : "Not set",
        databaseId: process.env.NOTION_DATABASE_ID ? process.env.NOTION_DATABASE_ID.substring(0, 8) + "..." : "Not set",
      },
    })
  } catch (error) {
    console.error("❌ Test API error:", error)

    return NextResponse.json({
      success: false,
      message: "Test endpoint failed",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    })
  }
}
