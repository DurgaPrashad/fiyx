import { NextResponse } from "next/server"
import { exec } from "child_process"
import fs from "fs"
import path from "path"
import { promisify } from "util"

const execPromise = promisify(exec)

export async function POST(request: Request) {
  try {
    const { url, quality, adViewed } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Check if 4K quality requires ad viewing
    if (quality === "4k" && !adViewed) {
      return NextResponse.json({ error: "Ad viewing required for 4K downloads", requiresAd: true }, { status: 403 })
    }

    // Determine if the URL is valid
    try {
      new URL(url)
    } catch (e) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Path to the Python script
    const pythonScriptPath = path.join(process.cwd(), "app", "api", "python", "download.py")

    // Ensure the Python script exists
    if (!fs.existsSync(pythonScriptPath)) {
      return NextResponse.json({ error: "Server configuration error: Download script not found" }, { status: 500 })
    }

    // Prepare input data for Python script
    const inputData = JSON.stringify({ url, quality })

    // Execute Python script
    const { stdout, stderr } = await execPromise(`python "${pythonScriptPath}" '${inputData}'`)

    if (stderr) {
      console.error("Python script error:", stderr)
      return NextResponse.json({ error: "Failed to process video" }, { status: 500 })
    }

    // Parse Python script output
    const result = JSON.parse(stdout)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to download video" }, { status: 500 })
    }

    // Read the downloaded file
    const filePath = result.file_path
    const fileBuffer = fs.readFileSync(filePath)

    // Clean up the file after reading
    fs.unlinkSync(filePath)

    // Create filename for download
    const sanitizedTitle = result.title.replace(/[^\w\s.-]/g, "_")
    const filename = `${sanitizedTitle}.${result.ext}`

    // Return the file as a downloadable response
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error processing download:", error)
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 })
  }
}
