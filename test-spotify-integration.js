// Test the Spotify integration with your new refresh token
const client_id = "da5ca557657548f38a16b1c912472f83"
const client_secret = "5253d8bc73c44216b252b5ed518ef03c"

// This should be your new refresh token from the previous step
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || "YOUR_NEW_REFRESH_TOKEN_HERE"

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`

async function testSpotifyIntegration() {
  try {
    console.log("🎵 Testing Spotify Integration...")
    console.log("=".repeat(50))

    // Step 1: Test token refresh
    console.log("1️⃣ Testing token refresh...")
    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }).toString(),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error("❌ Token refresh failed:", tokenData)
      return
    }

    console.log("✅ Token refresh successful!")
    console.log("🔑 Access token received:", tokenData.access_token.substring(0, 20) + "...")

    // Step 2: Test Now Playing API
    console.log("\n2️⃣ Testing Now Playing API...")
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    console.log("📡 API Response Status:", nowPlayingResponse.status)

    if (nowPlayingResponse.status === 204) {
      console.log("🎵 No music currently playing")
      console.log("✅ Integration working! (Just not playing music right now)")
    } else if (nowPlayingResponse.status === 200) {
      const nowPlayingData = await nowPlayingResponse.json()
      console.log("🎵 Currently playing:")
      console.log("🎤 Track:", nowPlayingData.item?.name || "Unknown")
      console.log("👨‍🎤 Artist:", nowPlayingData.item?.artists?.[0]?.name || "Unknown")
      console.log("💿 Album:", nowPlayingData.item?.album?.name || "Unknown")
      console.log("▶️ Is Playing:", nowPlayingData.is_playing)
      console.log("✅ Integration working perfectly!")
    } else {
      const errorData = await nowPlayingResponse.text()
      console.log("⚠️ Unexpected response:", errorData)
    }

    console.log("\n" + "=".repeat(50))
    console.log("🚀 Integration test complete!")
    console.log("💡 Your Spotify widget should now work on your live site.")
    console.log("🌐 Visit: https://anilg.vercel.app to see it in action!")
  } catch (error) {
    console.error("❌ Test failed:", error.message)
  }
}

testSpotifyIntegration()
