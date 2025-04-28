import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Fiyx Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="font-bold text-xl">Fiyx</span>
          </Link>
          <nav>
            <Link href="/" className="px-4 py-2 hover:text-primary transition-colors">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-6">About Fiyx</h1>

          <div className="prose max-w-none">
            <p className="text-lg">
              Fiyx is a powerful web application designed to help users download high-quality videos from popular social
              media platforms including YouTube, Instagram, Facebook, and Twitter/X.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to provide a simple, efficient, and reliable way for users to save and enjoy their favorite
              online videos in the highest possible quality. We believe in making content accessible across devices and
              platforms.
            </p>

            <h2>Video Quality</h2>
            <p>
              At Fiyx, we prioritize video quality. Our platform is designed to download videos in 4K Ultra HD
              resolution (3840 × 2160) whenever available, with enhanced visual features:
            </p>

            <ul>
              <li>Vivid and slightly enhanced colors with boosted saturation</li>
              <li>Natural lighting and sharp details</li>
              <li>Crisp textures with minimal noise</li>
              <li>High bitrate (40+ Mbps) for maximum clarity</li>
              <li>Optimized post-processing for the best visual experience</li>
            </ul>

            <h2>Technical Specifications</h2>
            <p>Our downloads offer the following technical specifications:</p>

            <ul>
              <li>
                <strong>Resolution:</strong> Up to 3840 × 2160 (4K Ultra HD)
              </li>
              <li>
                <strong>Framerate:</strong> Up to 60fps for smooth playback
              </li>
              <li>
                <strong>Bitrate:</strong> High (40-50 Mbps for MP4)
              </li>
              <li>
                <strong>Format:</strong> MP4 (H.264 codec for compatibility)
              </li>
              <li>
                <strong>Enhancement:</strong> Optimized saturation, sharpness, and noise reduction
              </li>
            </ul>

            <h2>How It Works</h2>
            <p>Using Fiyx is simple:</p>

            <ol>
              <li>Copy the URL of the video you want to download</li>
              <li>Paste the URL into the input field on our homepage</li>
              <li>Click the "Download" button</li>
              <li>Select your preferred quality options</li>
              <li>Download and enjoy your video</li>
            </ol>

            <h2>Contact Us</h2>
            <p>
              If you have any questions, feedback, or concerns, please don't hesitate to reach out to us at
              support@fiyx.com.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fiyx. All rights reserved.</p>
          <p className="mt-2">A powerful tool for downloading high-quality videos from social media.</p>
        </div>
      </footer>
    </div>
  )
}
