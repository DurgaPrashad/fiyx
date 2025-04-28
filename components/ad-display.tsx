"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface AdDisplayProps {
  onComplete: () => void
}

export default function AdDisplay({ onComplete }: AdDisplayProps) {
  const [progress, setProgress] = useState(0)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    // Simulate ad loading
    const loadTimer = setTimeout(() => {
      setAdLoaded(true)
    }, 1500)

    return () => clearTimeout(loadTimer)
  }, [])

  useEffect(() => {
    if (!adLoaded) return

    // Simulate ad progress
    const duration = 15 // seconds
    const interval = 100 // ms
    const increment = (interval / (duration * 1000)) * 100

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment
        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [adLoaded])

  useEffect(() => {
    if (progress === 100) {
      // Ad completed
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 500)

      return () => clearTimeout(completeTimer)
    }
  }, [progress, onComplete])

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl bg-muted rounded-lg overflow-hidden mb-4">
        <div className="aspect-video flex items-center justify-center bg-black/5 relative">
          {!adLoaded ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
              <p>Loading advertisement...</p>
            </div>
          ) : (
            <>
              {/* This would be replaced with actual ad content in production */}
              <div className="text-center p-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg mb-4">
                  <h3 className="text-xl font-bold mb-2">Premium Video Downloader</h3>
                  <p>Unlock unlimited 4K downloads with our premium subscription!</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is a simulated advertisement. In a real application, this would be an actual ad from Google
                  AdSense.
                </p>
              </div>

              {/* Ad overlay with progress */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 flex items-center">
                <span className="text-sm mr-2">Ad: {Math.round(progress)}% complete</span>
                <Progress value={progress} className="flex-1" />
              </div>
            </>
          )}
        </div>
      </div>

      {progress === 100 && (
        <Button onClick={onComplete} className="mt-2">
          Continue to Download
        </Button>
      )}
    </div>
  )
}
