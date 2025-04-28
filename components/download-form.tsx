"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import AdDisplay from "@/components/ad-display"

export default function DownloadForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [quality, setQuality] = useState("1080p")
  const [showAd, setShowAd] = useState(false)
  const [adViewed, setAdViewed] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState("")
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  // Available quality options
  const qualityOptions = [
    { quality: "4k", label: "4K Ultra HD (3840×2160)", requiresAd: true },
    { quality: "1080p", label: "Full HD (1920×1080)", requiresAd: false },
    { quality: "720p", label: "HD (1280×720)", requiresAd: false },
    { quality: "480p", label: "SD (854×480)", requiresAd: false },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setError("Please enter a valid URL")
      return
    }

    // Check if 4K quality requires ad and hasn't been viewed
    if (quality === "4k" && !adViewed) {
      setShowAd(true)
      return
    }

    setLoading(true)
    setError("")
    setDownloadStatus("Preparing your download...")

    try {
      const response = await fetch("/api/download-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, quality, adViewed }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // Check if ad is required
        if (errorData.requiresAd) {
          setShowAd(true)
          setLoading(false)
          return
        }

        throw new Error(errorData.error || "Download failed")
      }

      // Handle successful response
      const blob = await response.blob()

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob)

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get("Content-Disposition") || ""
      const filenameMatch = contentDisposition.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : `video-${Date.now()}.mp4`

      // Create and click download link
      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = downloadUrl
        downloadLinkRef.current.download = filename
        downloadLinkRef.current.click()

        // Clean up
        setTimeout(() => {
          window.URL.revokeObjectURL(downloadUrl)
        }, 100)
      }

      setDownloadStatus("Download complete!")
    } catch (err) {
      console.error("Download error:", err)
      setError(err instanceof Error ? err.message : "Download failed. Please try again.")
      setDownloadStatus("")
    } finally {
      setLoading(false)
    }
  }

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality)
    // Reset ad viewed status when changing to 4K
    if (newQuality === "4k") {
      setAdViewed(false)
    }
  }

  const handleAdComplete = () => {
    setAdViewed(true)
    setShowAd(false)
    // Auto-submit the form after ad is viewed
    handleSubmit(new Event("submit") as unknown as React.FormEvent)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-6">
        <Input
          type="url"
          placeholder="Paste video URL from Instagram, YouTube, Facebook, or Twitter/X"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />

        <Select value={quality} onValueChange={handleQualityChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent>
            {qualityOptions.map((option) => (
              <SelectItem key={option.quality} value={option.quality}>
                {option.label} {option.requiresAd && "(Ad Required)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit" disabled={loading || !url}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download
            </>
          )}
        </Button>

        {/* Hidden download link */}
        <a ref={downloadLinkRef} className="hidden" />
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {downloadStatus && !error && (
        <Alert className="mb-6">
          <AlertDescription>{downloadStatus}</AlertDescription>
        </Alert>
      )}

      {showAd && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg">Watch Ad to Download in 4K</h3>
              <p className="text-sm text-muted-foreground">Please watch the ad to unlock 4K downloads</p>
            </div>
            <AdDisplay onComplete={handleAdComplete} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
