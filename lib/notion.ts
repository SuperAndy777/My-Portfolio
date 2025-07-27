import { Client } from "@notionhq/client"

export interface NotionJournalEntry {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
  status: string
  tags?: string[]
  lastEdited: string
}

let notionClient: Client | null = null

export function getNotionClient(): Client | null {
  if (!process.env.NOTION_TOKEN) {
    console.log("⚠️ NOTION_TOKEN not found in environment variables")
    return null
  }

  if (!notionClient) {
    try {
      notionClient = new Client({
        auth: process.env.NOTION_TOKEN,
      })
      console.log("✅ Notion client initialized successfully")
    } catch (error) {
      console.error("❌ Failed to initialize Notion client:", error)
      return null
    }
  }

  return notionClient
}

export async function getJournalEntries(): Promise<NotionJournalEntry[]> {
  const client = getNotionClient()

  if (!client) {
    console.log("❌ Notion client not available")
    return []
  }

  if (!process.env.NOTION_DATABASE_ID) {
    console.log("⚠️ NOTION_DATABASE_ID not found in environment variables")
    return []
  }

  try {
    console.log(`📡 Fetching from Notion database: ${process.env.NOTION_DATABASE_ID}`)

    const response = await client.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        or: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          // Fallback: if no Status property, include all entries
          {
            property: "Status",
            select: {
              is_empty: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    })

    console.log(`📊 Notion response: ${response.results.length} entries found`)

    const entries: NotionJournalEntry[] = []

    for (const page of response.results) {
      try {
        if (!("properties" in page)) continue

        const properties = page.properties

        // Extract title
        let title = "Untitled"
        if (properties.Title && properties.Title.type === "title" && properties.Title.title.length > 0) {
          title = properties.Title.title[0].plain_text
        } else if (properties.Name && properties.Name.type === "title" && properties.Name.title.length > 0) {
          title = properties.Name.title[0].plain_text
        }

        // Extract date
        let date = new Date().toISOString().split("T")[0]
        if (properties.Date && properties.Date.type === "date" && properties.Date.date) {
          date = properties.Date.date.start
        }

        // Extract excerpt
        let excerpt = "No excerpt available"
        if (properties.Excerpt && properties.Excerpt.type === "rich_text" && properties.Excerpt.rich_text.length > 0) {
          excerpt = properties.Excerpt.rich_text[0].plain_text
        }

        // Extract category
        let category = "general"
        if (properties.Category && properties.Category.type === "select" && properties.Category.select) {
          category = properties.Category.select.name.toLowerCase()
        }

        // Extract status
        let status = "published"
        if (properties.Status && properties.Status.type === "select" && properties.Status.select) {
          status = properties.Status.select.name.toLowerCase()
        }

        // Extract tags
        let tags: string[] = []
        if (properties.Tags && properties.Tags.type === "multi_select") {
          tags = properties.Tags.multi_select.map((tag: any) => tag.name)
        }

        const entry: NotionJournalEntry = {
          id: page.id,
          title,
          date: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          excerpt,
          category,
          status,
          tags,
          lastEdited: page.last_edited_time,
        }

        entries.push(entry)
        console.log(`✅ Processed entry: ${title}`)
      } catch (entryError) {
        console.error("❌ Error processing entry:", entryError)
        continue
      }
    }

    console.log(`🎉 Successfully processed ${entries.length} journal entries`)
    return entries
  } catch (error) {
    console.error("❌ Error fetching from Notion:", error)
    return []
  }
}

export async function testNotionConnection(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  try {
    const client = getNotionClient()

    if (!client) {
      return {
        success: false,
        message: "Notion client could not be initialized. Check your NOTION_TOKEN.",
      }
    }

    if (!process.env.NOTION_DATABASE_ID) {
      return {
        success: false,
        message: "NOTION_DATABASE_ID not found in environment variables.",
      }
    }

    console.log("🧪 Testing Notion connection...")

    const response = await client.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    })

    return {
      success: true,
      message: "Successfully connected to Notion database!",
      details: {
        title: response.title,
        properties: Object.keys(response.properties),
        created: response.created_time,
        lastEdited: response.last_edited_time,
      },
    }
  } catch (error: any) {
    console.error("❌ Notion connection test failed:", error)

    return {
      success: false,
      message: `Connection failed: ${error.message}`,
      details: {
        code: error.code,
        status: error.status,
      },
    }
  }
}
