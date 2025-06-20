import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Authorization Error</title>
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              background: linear-gradient(135deg, #1e3a8a, #1e40af);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
            }
            .container { 
              text-align: center; 
              padding: 2rem;
              background: rgba(0,0,0,0.3);
              border-radius: 1rem;
              backdrop-filter: blur(10px);
            }
            .error { color: #ef4444; }
            .button {
              display: inline-block;
              padding: 0.75rem 1.5rem;
              background: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 0.5rem;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎵 Spotify Authorization</h1>
            <p class="error">❌ Error: ${error}</p>
            <p>Authorization was denied or failed.</p>
            <a href="/" class="button">Return to Home</a>
          </div>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  }

  if (!code) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Authorization</title>
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              background: linear-gradient(135deg, #1e3a8a, #1e40af);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
            }
            .container { 
              text-align: center; 
              padding: 2rem;
              background: rgba(0,0,0,0.3);
              border-radius: 1rem;
              backdrop-filter: blur(10px);
            }
            .button {
              display: inline-block;
              padding: 0.75rem 1.5rem;
              background: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 0.5rem;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎵 Spotify Authorization</h1>
            <p>❌ No authorization code received.</p>
            <a href="/" class="button">Return to Home</a>
          </div>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  }

  // Success page with the authorization code
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spotify Authorization Success</title>
        <style>
          body { 
            font-family: system-ui, sans-serif; 
            background: linear-gradient(135deg, #1e3a8a, #1e40af);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
          }
          .container { 
            text-align: center; 
            padding: 2rem;
            background: rgba(0,0,0,0.3);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            max-width: 600px;
          }
          .success { color: #10b981; }
          .code { 
            background: rgba(0,0,0,0.5); 
            padding: 1rem; 
            border-radius: 0.5rem; 
            font-family: monospace; 
            word-break: break-all;
            margin: 1rem 0;
          }
          .button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #10b981;
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            margin-top: 1rem;
          }
          .copy-btn {
            background: #6366f1;
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
            margin-left: 0.5rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎵 Spotify Authorization Success!</h1>
          <p class="success">✅ Authorization code received successfully!</p>
          <p>Your authorization code:</p>
          <div class="code" id="authCode">${code}</div>
          <button class="copy-btn" onclick="copyCode()">Copy Code</button>
          <p><strong>Next steps:</strong></p>
          <ol style="text-align: left; max-width: 400px; margin: 0 auto;">
            <li>Copy the authorization code above</li>
            <li>Run the exchange script with this code</li>
            <li>Update your Vercel environment variables</li>
            <li>Redeploy your site</li>
          </ol>
          <a href="/" class="button">Return to Home</a>
        </div>
        <script>
          function copyCode() {
            const code = document.getElementById('authCode').textContent;
            navigator.clipboard.writeText(code).then(() => {
              alert('Code copied to clipboard!');
            });
          }
        </script>
      </body>
    </html>
    `,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  )
}
