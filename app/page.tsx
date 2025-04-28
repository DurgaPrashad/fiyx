import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DownloadForm from "@/components/download-form"

export default function Home() {
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
            <Link href="/about" className="px-4 py-2 hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Download Videos in 4K Ultra HD</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Download high-quality videos from Instagram, YouTube, Facebook, and Twitter with just one click
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm">YouTube</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-sm">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Facebook className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm">Facebook</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <Twitter className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm">Twitter/X</span>
            </div>
          </div>

          <DownloadForm />
        </section>

        <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 py-12">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">High Quality Downloads</h2>
            <p>
              Download videos in 4K Ultra HD (3840 × 2160) with enhanced colors, natural lighting, and sharp details.
              Our platform ensures maximum clarity and visual quality.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Multiple Platforms</h2>
            <p>
              Fiyx supports video downloads from all major social media platforms including YouTube, Instagram,
              Facebook, and Twitter/X with a simple paste-and-download process.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Advanced Processing</h2>
            <p>
              Our system applies optimal post-processing with increased color saturation, light sharpening, noise
              reduction, and detail enhancement for the best visual experience.
            </p>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cross-Device Compatibility</h2>
            <p>
              Fiyx works seamlessly across all your devices - desktop, laptop, tablet, and mobile phones, providing a
              consistent experience everywhere.
            </p>
          </div>
        </section>
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
