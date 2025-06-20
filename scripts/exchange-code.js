// Script to exchange a new authorization code for refresh token
const client_id = "da5ca557657548f38a16b1c912472f83"
const client_secret = "5253d8bc73c44216b252b5ed518ef03c"
const redirect_uri = "https://anilg.vercel.app/api/auth/callback/spotify"

// Get the authorization code from command line arguments
const code = process.argv[2]

if (!code) {
  console.log("❌ Please provide the authorization code:")
  console.log("Usage: node scripts/exchange-code.js YOUR_CODE_HERE")
  process.exit(1)
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

async function getRefreshToken() {
  try {
    console.log("🎵 Exchanging authorization code for refresh token...")

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }).toString(),
    })

    const data = await response.json()

    if (response.ok) {
      console.log("✅ Success! Here's your NEW refresh token:")
      console.log("🔑 REFRESH_TOKEN:", data.refresh_token)
      console.log("\n📝 Update your Vercel environment variable:")
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`)
      console.log("\n🎯 Access token (expires in 1 hour):", data.access_token)
      console.log("⏰ Expires in:", data.expires_in, "seconds")
      console.log("\n🚀 After updating Vercel, redeploy your site!")
    } else {
      console.error("❌ Error:", data)
      if (data.error === "invalid_grant") {
        console.log("\n💡 The authorization code has expired or been used.")
        console.log("Please run: node scripts/get-new-refresh-token.js")
        console.log("And get a fresh authorization code.")
      }
    }
  } catch (error) {
    console.error("❌ Network error:", error)
  }
}

getRefreshToken()
