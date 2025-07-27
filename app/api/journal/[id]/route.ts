import { NextResponse } from "next/server"
import { getNotionClient } from "@/lib/notion"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Entry ID is required" }, { status: 400 })
    }

    const client = getNotionClient()

    if (!client) {
      return NextResponse.json({ error: "Notion client not available" }, { status: 500 })
    }

    console.log(`📖 Fetching journal entry: ${id}`)

    const page = await client.pages.retrieve({ page_id: id })

    if (!("properties" in page)) {
      return NextResponse.json({ error: "Invalid page format" }, { status: 404 })
    }

    // Extract page content
    const blocks = await client.blocks.children.list({
      block_id: id,
    })

    return NextResponse.json({
      id: page.id,
      properties: page.properties,
      content: blocks.results,
      lastEdited: page.last_edited_time,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("❌ Error fetching journal entry:", error)

    if (error.code === "object_not_found") {
      return NextResponse.json({ error: "Journal entry not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed to fetch journal entry" }, { status: 500 })
  }
}
