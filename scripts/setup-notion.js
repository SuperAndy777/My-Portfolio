#!/usr/bin/env node

const readline = require("readline")
const fs = require("fs")
const path = require("path")

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`
}

function printHeader() {
  console.log("\n" + colorize("🚀 Notion Journal Integration Setup", "cyan"))
  console.log(colorize("=====================================", "cyan"))
  console.log("\nThis script will help you set up your Notion integration for the journal section.\n")
}

function printInstructions() {
  console.log(colorize("📋 Before you start:", "yellow"))
  console.log("1. Create a Notion integration at https://www.notion.so/my-integrations")
  console.log("2. Create a database in Notion with these properties:")
  console.log("   - Title (Title)")
  console.log("   - Date (Date)")
  console.log("   - Excerpt (Text)")
  console.log("   - Category (Select: tech, leadership, creative)")
  console.log("   - Status (Select: Published, Draft)")
  console.log("3. Share your database with your integration")
  console.log("4. Get your integration token and database ID\n")
}

function validateToken(token) {
  if (!token || typeof token !== "string") {
    return false
  }

  // Remove any whitespace
  token = token.trim()

  // Check if it starts with secret_
  if (!token.startsWith("secret_")) {
    return false
  }

  // Check if it has reasonable length (Notion tokens are typically around 50+ chars)
  if (token.length < 40) {
    return false
  }

  return true
}

function validateDatabaseId(id) {
  if (!id || typeof id !== "string") {
    return false
  }

  // Remove any whitespace
  id = id.trim()

  // If it's a URL, extract the ID
  if (id.includes("notion.so")) {
    const match = id.match(/([a-f0-9]{32})/)
    if (match) {
      return match[1]
    }
    return false
  }

  // Check if it's a valid UUID format (32 hex chars)
  const uuidRegex = /^[a-f0-9]{32}$/i
  if (uuidRegex.test(id.replace(/-/g, ""))) {
    return id.replace(/-/g, "")
  }

  return false
}

function createEnvContent(token, databaseId) {
  return `# Notion Integration
NOTION_TOKEN=${token}
NOTION_DATABASE_ID=${databaseId}
`
}

function saveToEnvFile(content) {
  const envPath = path.join(process.cwd(), ".env.local")

  try {
    let existingContent = ""
    if (fs.existsSync(envPath)) {
      existingContent = fs.readFileSync(envPath, "utf8")
    }

    // Remove existing Notion variables
    const lines = existingContent
      .split("\n")
      .filter((line) => !line.startsWith("NOTION_TOKEN=") && !line.startsWith("NOTION_DATABASE_ID="))

    // Add new Notion variables
    const newContent = lines.join("\n") + "\n" + content

    fs.writeFileSync(envPath, newContent.trim() + "\n")
    return true
  } catch (error) {
    console.error(colorize(`Error writing to .env.local: ${error.message}`, "red"))
    return false
  }
}

async function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

async function main() {
  try {
    printHeader()
    printInstructions()

    // Get Notion token
    let token
    while (!token) {
      const input = await promptUser(colorize("Enter your Notion integration token: ", "green"))

      if (!input) {
        console.log(colorize("Token is required. Please try again.\n", "red"))
        continue
      }

      if (!validateToken(input)) {
        console.log(
          colorize(
            "Invalid token format. Token should start with 'secret_' and be at least 40 characters long.\n",
            "red",
          ),
        )
        continue
      }

      token = input.trim()
    }

    // Get database ID
    let databaseId
    while (!databaseId) {
      const input = await promptUser(colorize("Enter your Notion database ID or URL: ", "green"))

      if (!input) {
        console.log(colorize("Database ID is required. Please try again.\n", "red"))
        continue
      }

      const validatedId = validateDatabaseId(input)
      if (!validatedId) {
        console.log(colorize("Invalid database ID format. Please provide a valid Notion database ID or URL.\n", "red"))
        continue
      }

      databaseId = validatedId
    }

    console.log("\n" + colorize("✅ Validation successful!", "green"))
    console.log(`Token: ${token.substring(0, 20)}...`)
    console.log(`Database ID: ${databaseId}`)

    // Create environment variables content
    const envContent = createEnvContent(token, databaseId)

    // Save to .env.local
    if (saveToEnvFile(envContent)) {
      console.log("\n" + colorize("✅ Environment variables saved to .env.local", "green"))
    } else {
      console.log("\n" + colorize("❌ Failed to save environment variables", "red"))
      console.log("\nPlease manually add these to your .env.local file:")
      console.log(colorize(envContent, "yellow"))
    }

    // Print next steps
    console.log("\n" + colorize("🎉 Setup complete!", "cyan"))
    console.log("\n" + colorize("Next steps:", "yellow"))
    console.log("1. Restart your development server")
    console.log("2. Visit /api/journal/test to test the connection")
    console.log("3. Visit /api/journal to see your entries")
    console.log("4. Make sure your database has at least one entry with Status = 'Published'")

    console.log("\n" + colorize("For Vercel deployment:", "yellow"))
    console.log("1. Go to your Vercel dashboard")
    console.log("2. Navigate to Settings > Environment Variables")
    console.log("3. Add these variables:")
    console.log(`   NOTION_TOKEN = ${token}`)
    console.log(`   NOTION_DATABASE_ID = ${databaseId}`)
    console.log("4. Redeploy your application")

    console.log("\n" + colorize("Happy journaling! 📝", "magenta"))
  } catch (error) {
    if (error.message === "canceled") {
      console.log("\n" + colorize("Setup canceled by user.", "yellow"))
      process.exit(0)
    } else {
      console.error("\n" + colorize(`Setup failed: ${error.message}`, "red"))
      process.exit(1)
    }
  }
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n" + colorize("Setup canceled by user.", "yellow"))
  rl.close()
  process.exit(0)
})

// Run the setup
main()
