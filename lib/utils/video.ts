import { useEffect, useState } from 'react';
import { VideoSources } from '@/constants/settings';

export function useVideoSource() {
  // Mulai dengan default video untuk desktop
  const [videoSrc, setVideoSrc] = useState<string>(VideoSources.desktop);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      const isMobile = window.matchMedia(`(max-width: ${VideoSources.breakpoint - 1}px)`).matches;
      setVideoSrc(isMobile ? VideoSources.mobile : VideoSources.desktop);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  return videoSrc;
} 