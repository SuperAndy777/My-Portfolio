// Updated script to get a fresh refresh token
const client_id = "da5ca557657548f38a16b1c912472f83"
const client_secret = "5253d8bc73c44216b252b5ed518ef03c"
const redirect_uri = "https://anilg.vercel.app/api/auth/callback/spotify"

console.log("🎵 Getting fresh Spotify authorization...")
console.log("\n📋 Step 1: Visit this URL to authorize:")
console.log(
  `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user-read-currently-playing%20user-read-playback-state`,
)

console.log("\n📋 Step 2: After authorization, you'll be redirected to:")
console.log("https://anilg.vercel.app/api/auth/callback/spotify?code=YOUR_CODE")

console.log("\n📋 Step 3: Copy the 'code' parameter from the URL and paste it below:")
console.log("Then run: node scripts/exchange-code.js YOUR_CODE_HERE")
