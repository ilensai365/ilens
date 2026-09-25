import { useEffect, useRef } from "react";
import { heroVideo } from "../data/site";

/** Background video; streams .m3u8 through hls.js (lazy-loaded) where native HLS isn't available. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const { src, poster } = heroVideo;

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    if (!src.endsWith(".m3u8") || video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }
    let cancelled = false;
    let destroy = () => {};
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      const hls = new Hls({ capLevelToPlayerSize: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      destroy = () => hls.destroy();
    });
    return () => {
      cancelled = true;
      destroy();
    };
  }, [src]);

  if (!src) return null;
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
