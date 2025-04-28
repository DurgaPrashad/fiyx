import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fiyx - Social Media Video Downloader",
  description: "Download high-quality videos from Instagram, YouTube, Facebook, and Twitter with just one click",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2943502079302404" />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2943502079302404"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
