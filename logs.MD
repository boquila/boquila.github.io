# Video Compression Log

## Backup
- Created `assets/scroll/og/` to store originals before any processing.

## Settings Used
- **Codec:** H.264 (libx264)
- **CRF:** 28 (good balance of quality vs size for web)
- **Preset:** fast (reasonable speed/quality tradeoff)
- **Audio:** stripped (`-an`)
- **Streaming:** `+faststart` for progressive web playback

## Commands

### Standard compression (for videos 1, 2, 4)
```bash
ffmpeg -y -i assets/scroll/og/videoN.mp4 \
  -c:v libx264 -crf 28 -preset fast \
  -movflags +faststart -an \
  assets/scroll/videoN.mp4
```

### Trim + compress (for video3)
Original was 9.28s. Trimmed first 0.5s and last 3s, keeping ~5.8s of content.
```bash
ffmpeg -y -i assets/scroll/og/video3.mp4 \
  -ss 00:00:00.5 -to 00:00:06.28 \
  -c:v libx264 -crf 28 -preset fast \
  -movflags +faststart -an \
  assets/scroll/video3.mp4
```

## Results

| Video | Original | Compressed | Savings |
|-------|----------|------------|---------|
| video1 | 2.5 MB | 0.3 MB | ~88% |
| video2 | 2.7 MB | 0.1 MB | ~96% |
| video3 | 8.5 MB | 0.8 MB | ~91% |
| video4 | 1.8 MB | ~0 MB | ~99% |

**Total:** 15.5 MB → ~1.2 MB

## Notes
- Videos are short looping demos; audio is unnecessary.
- `preload="none"` + JS play-on-visible is used in the site to avoid loading all videos at once.
- If final videos are added later, run the same commands and update `index.html` references.
