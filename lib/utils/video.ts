import { useEffect, useState } from 'react';

export function useVideoSource() {
  const [videoSrc, setVideoSrc] = useState('/HeroSection/spline.webm');

  useEffect(() => {
    // Hanya jalankan di client-side
    if (typeof window !== 'undefined') {
      function handleResize() {
        setVideoSrc(window.innerWidth < 768 ? '/HeroSection/spline-mobile.webm' : '/HeroSection/spline.webm');
      }

      // Set initial value
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return videoSrc;
} 