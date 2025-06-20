// Script to exchange authorization code for refresh token
const client_id = "da5ca557657548f38a16b1c912472f83"
const client_secret = "5253d8bc73c44216b252b5ed518ef03c"
const redirect_uri = "https://anilg.vercel.app/api/auth/callback/spotify"

// Your authorization code from the redirect URL
const code =
  "AQB67z8xnAVDZBbvMD32Q7MGwmFnHqlNW2GIWJopgp1v_v8DGpQhIHoICdDXb71vUAnOKzUdiK9Sd1YJ9R9N5RLYDuuRuGwFcr2bscajT9tuSGOHwmVj-MnsAu9ZiXYx22VvbPL-QIk0iWXil8giFjQr056JkXOVQ2C3YFVPHKdDL2NH0FvG9pDb07LbG03Ojyxv826mbUd-RCugbvxOW1fzLUkDf8s_TfuNpU_D83Z-QgY"

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
      }),
    })

    const data = await response.json()

    if (response.ok) {
      console.log("✅ Success! Here's your refresh token:")
      console.log("🔑 REFRESH_TOKEN:", data.refresh_token)
      console.log("\n📝 Add this to your .env.local file:")
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`)
      console.log("\n🎯 Access token (expires in 1 hour):", data.access_token)
      console.log("⏰ Expires in:", data.expires_in, "seconds")
    } else {
      console.error("❌ Error:", data)
    }
  } catch (error) {
    console.error("❌ Network error:", error)
  }
}

getRefreshToken()
