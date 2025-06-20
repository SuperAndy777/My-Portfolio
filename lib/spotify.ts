const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  if (!refresh_token) {
    throw new Error("No refresh token available")
  }

  if (!client_id || !client_secret) {
    throw new Error("Missing Spotify client credentials")
  }

  const response = await fetch(TOKEN_ENDPOINT, {
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

  const data = await response.json()

  // Handle a bad refresh token explicitly
  if (data?.error === "invalid_grant") {
    console.warn("⚠️  Refresh token is invalid or expired.")
    return { error: "invalid_refresh_token" } as any
  }

  if (!response.ok) {
    console.error("Token refresh error:", data)
    return { error: data?.error || "token_refresh_failed" } as any
  }

  return data
}

export const getNowPlaying = async () => {
  try {
    if (!refresh_token) {
      console.log("No refresh token available")
      return { isPlaying: false, error: "No refresh token configured" }
    }

    if (!client_id || !client_secret) {
      console.log("Missing Spotify credentials")
      return { isPlaying: false, error: "Missing Spotify credentials" }
    }

    const { access_token } = await getAccessToken()

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // Handle different response statuses
    if (response.status === 204) {
      // No content - not playing
      return { isPlaying: false }
    }

    if (response.status === 401) {
      // Unauthorized - token might be invalid
      return { isPlaying: false, error: "Spotify authorization expired" }
    }

    if (response.status >= 400) {
      // Other errors
      return { isPlaying: false, error: `Spotify API error: ${response.status}` }
    }

    const song = await response.json()

    if (!song || !song.item) {
      return { isPlaying: false }
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ")
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0]?.url
    const songUrl = song.item.external_urls.spotify
    const progress = song.progress_ms
    const duration = song.item.duration_ms

    return {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      progress,
      duration,
    }
  } catch (error) {
    console.error("Error fetching now playing:", error)
    return {
      isPlaying: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
