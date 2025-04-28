#!/usr/bin/env python3
import sys
import json
import os
from urllib.parse import urlparse
import yt_dlp

def get_platform(url):
    """Determine the platform from the URL."""
    domain = urlparse(url).netloc.lower()
    
    if "youtube.com" in domain or "youtu.be" in domain:
        return "YouTube"
    elif "instagram.com" in domain:
        return "Instagram"
    elif "facebook.com" in domain or "fb.com" in domain:
        return "Facebook"
    elif "twitter.com" in domain or "x.com" in domain:
        return "Twitter"
    else:
        return "Unknown"

def get_format_code(platform, quality):
    """Get the appropriate format code based on platform and quality."""
    if platform == "YouTube":
        if quality == "4k":
            return "bestvideo[height<=2160]+bestaudio/best[height<=2160]"
        elif quality == "1080p":
            return "bestvideo[height<=1080]+bestaudio/best[height<=1080]"
        elif quality == "720p":
            return "bestvideo[height<=720]+bestaudio/best[height<=720]"
        else:  # 480p
            return "bestvideo[height<=480]+bestaudio/best[height<=480]"
    else:
        # For other platforms, use simpler format selection
        if quality == "4k":
            return "best[height<=2160]"
        elif quality == "1080p":
            return "best[height<=1080]"
        elif quality == "720p":
            return "best[height<=720]"
        else:  # 480p
            return "best[height<=480]"

def download_video(url, quality):
    """Download video using yt-dlp."""
    platform = get_platform(url)
    format_code = get_format_code(platform, quality)
    
    # Create a temporary directory for downloads
    temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "temp")
    os.makedirs(temp_dir, exist_ok=True)
    
    # Set up yt-dlp options
    ydl_opts = {
        'format': format_code,
        'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
        'quiet': True,
        'no_warnings': True,
        'restrictfilenames': True,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            downloaded_file = ydl.prepare_filename(info)
            
            # Return the file path and info
            return {
                'success': True,
                'file_path': downloaded_file,
                'title': info.get('title', 'video'),
                'ext': info.get('ext', 'mp4'),
                'platform': platform
            }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

if __name__ == "__main__":
    # Get input from Node.js
    input_data = json.loads(sys.argv[1])
    url = input_data.get('url')
    quality = input_data.get('quality', '1080p')
    
    # Download the video
    result = download_video(url, quality)
    
    # Return result to Node.js
    print(json.dumps(result))
