"use client";

import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { SiteSettings } from "@/constants/settings";
import { ModalTerms } from "@/components/modal-terms";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6";

export default function Intro() {
  const router = useRouter();
  const dingSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const splineRef = useRef<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoadingSpline, setIsLoadingSpline] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    let loadTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    // Fungsi untuk mengatur viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set viewport height saat pertama kali load
    setViewportHeight();

    // Update viewport height saat resize atau orientasi berubah
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    const initializeSpline = async () => {
      try {
        const canvas = document.getElementById("spline-scene") as HTMLCanvasElement;
        if (!canvas) throw new Error("Canvas not found");

        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 10;
          });
        }, 300);

        const app = new Application(canvas);
        splineRef.current = app;

        await app.load("https://prod.spline.design/oqHYtZFwqq7sElL9/scene.splinecode");
        
        // Set pointer-events untuk memastikan interaksi cursor
        canvas.style.pointerEvents = 'auto';
        canvas.style.cursor = 'pointer';

        // Tambahkan event listener untuk cursor
        const handleMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          // Gunakan koordinat untuk update scene
          if (splineRef.current) {
            splineRef.current.handleEvent('pointermove', { x, y });
          }
        };

        canvas.addEventListener('mousemove', handleMouseMove);

        setLoadingProgress(100);
        clearInterval(progressInterval);
        
        setTimeout(() => {
          setIsLoadingSpline(false);
        }, 500);

      } catch (error) {
        console.error("Spline load error:", error);
        setLoadingError("Failed to load 3D scene. Please refresh the page.");
        clearInterval(progressInterval);
        setLoadingProgress(0);
      }
    };

    // Handle window resize
    const handleResize = () => {
      const canvas = document.getElementById("spline-scene") as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    // Initialize audio
    dingSoundRef.current = new Audio('/sound/ding.aac');
    backgroundMusicRef.current = new Audio('/sound/backsound.aac');
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.5;
      backgroundMusicRef.current.preload = "auto";
      dingSoundRef.current.preload = "auto";
    }

    loadTimeout = setTimeout(initializeSpline, 100);

    return () => {
      clearTimeout(loadTimeout);
      clearInterval(progressInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
      if (splineRef.current) {
        const canvas = document.getElementById("spline-scene") as HTMLCanvasElement;
        if (canvas) {
          canvas.removeEventListener('mousemove', handleMouseMove);
        }
        splineRef.current.dispose();
      }
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
      if (dingSoundRef.current) {
        dingSoundRef.current.pause();
        dingSoundRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAgreeAndPlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setIsTransitioning(true);

    try {
      if (dingSoundRef.current) {
        await dingSoundRef.current.play();
        setIsModalOpen(false);
        
        // Fade in background music
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.volume = 0;
          await backgroundMusicRef.current.play();
          
          // Smooth volume transition
          const fadeInInterval = setInterval(() => {
            if (backgroundMusicRef.current && backgroundMusicRef.current.volume < 0.5) {
              backgroundMusicRef.current.volume += 0.05;
            } else {
              clearInterval(fadeInInterval);
            }
          }, 100);
        }
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsPlaying(false);
      setIsTransitioning(false);
    }
  };

  const handleStartExplore = async () => {
    // Set immediate navigation timeout
    const navigationTimeout = setTimeout(() => {
      // Pastikan audio berhenti sebelum navigasi fallback
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (audio instanceof HTMLAudioElement) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      window.location.href = '/home';
    }, 1000);

    try {
      const audioElements = document.querySelectorAll('audio');
      let isAnyPlaying = false;
      
      // Force stop background music immediately
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }

      audioElements.forEach(audio => {
        if (audio instanceof HTMLAudioElement && !audio.paused) {
          isAnyPlaying = true;
        }
      });

      // If no audio is playing, navigate immediately
      if (!isAnyPlaying) {
        clearTimeout(navigationTimeout);
        window.location.href = '/home';
        return;
      }

      // Try to fade out audio
      const fadeOutPromise = new Promise<void>((resolve) => {
        const fadeOutInterval = setInterval(() => {
          let allStopped = true;
          
          audioElements.forEach(audio => {
            if (audio instanceof HTMLAudioElement && !audio.paused) {
              if (audio.volume > 0) {
                audio.volume = Math.max(0, audio.volume - 0.02);
                allStopped = false;
              } else {
                // Jika volume sudah 0, langsung pause
                audio.pause();
                audio.currentTime = 0;
              }
            }
          });

          if (allStopped) {
            clearInterval(fadeOutInterval);
            // Pastikan semua audio benar-benar berhenti
            audioElements.forEach(audio => {
              if (audio instanceof HTMLAudioElement) {
                audio.pause();
                audio.currentTime = 0;
              }
            });
            resolve();
          }
        }, 30);
      });

      // Wait for fadeout with timeout
      await Promise.race([
        fadeOutPromise,
        new Promise(resolve => setTimeout(resolve, 800))
      ]);

      // Final cleanup sebelum navigasi
      audioElements.forEach(audio => {
        if (audio instanceof HTMLAudioElement) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      clearTimeout(navigationTimeout);
      window.location.href = '/home';
    } catch (error) {
      console.error("Error during transition:", error);
      // Pastikan audio berhenti meskipun ada error
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (audio instanceof HTMLAudioElement) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      // Fallback navigation will still happen due to timeout
    }
  };

  // Effect untuk menangani navigasi halaman
  useEffect(() => {
    const handleNavigation = () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    };
    
    // Cleanup pada unmount
    return () => {
      handleNavigation();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full overflow-hidden" 
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <audio ref={dingSoundRef} preload="auto">
        <source src="/sound/ding.aac" type="audio/aac" />
        Your browser does not support the audio element.
      </audio>

      <audio ref={backgroundMusicRef} loop preload="auto">
        <source src="/sound/backsound.aac" type="audio/aac" />
        Your browser does not support the audio element.
      </audio>

      {/* Spline Scene - Layer Paling Bawah */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
        <canvas
          id="spline-scene"
          className={`w-full h-full transition-opacity duration-700 ${
            !isLoadingSpline ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
            cursor: 'pointer',
            touchAction: 'none'
          }}
        />
      </div>

      {/* Mobile Interaction Blocker - Layer di atas Spline */}
      <div 
        className="fixed inset-0 z-[2] md:hidden"
        style={{
          pointerEvents: 'auto',
          touchAction: 'none'
        }}
      />

      {/* Dark Overlay - Layer di atas Mobile Blocker */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-1000 ease-in-out z-[3]
          ${isTransitioning ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-sm'}`}
        style={{ 
          pointerEvents: isTransitioning ? 'none' : 'auto',
          touchAction: 'none'
        }}
      />

      {/* Base Content - Layer di atas Dark Overlay */}
      <div 
        className="fixed inset-0 flex flex-col justify-center items-center text-center px-4 pb-20 pt-4 z-[15]"
        style={{ pointerEvents: 'none' }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="relative" style={{ pointerEvents: 'auto' }}>
            <Image
              src="/images/cancercoin-logo.png"
              alt={SiteSettings.title.full}
              className="w-32 h-32 object-contain"
              width={200}
              height={200}
            />
          </div>
          <div className="relative" style={{ pointerEvents: 'auto' }}>
            <Image
              src="/images/cancercoin-text.png"
              alt={SiteSettings.title.full}
              className="w-250 h-15 object-contain"
              width={1000}
              height={180}
            />
          </div>
          <div className="my-32" />
          <div className="relative w-full max-w-[200px] mx-auto" style={{ pointerEvents: 'auto' }}>
            <Button 
              className="bg-web3-primary hover:bg-web3-primary/90 w-full py-4 md:py-6"
              onClick={handleStartExplore}
            >
              <span className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
                Start Explore <FaArrowRightLong />
              </span>
            </Button>
          </div>
          <div className="flex gap-4 mt-4" style={{ pointerEvents: 'auto' }}>
            {SiteSettings.socials.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="icon"
                className="border-web3-primary text-web3-primary hover:bg-web3-primary/10"
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  {social.icon === "FaXTwitter" && (
                    <FaXTwitter className="h-5 w-5" />
                  )}
                  {social.icon === "FaLinkedin" && (
                    <Linkedin className="h-5 w-5" />
                  )}
                  <span className="sr-only">{social.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Overlay - Layer di atas Content */}
      {isLoadingSpline && (
        <div 
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[20]"
        >
          {loadingError ? (
            <div className="text-red-500 text-sm">{loadingError}</div>
          ) : (
            <>
              <div className="w-48 h-1 bg-gray-700 rounded-full mb-3">
                <div 
                  className="h-full bg-web3-primary rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="text-white text-sm">
                Loading scene... {Math.round(loadingProgress)}%
              </div>
            </>
          )}
        </div>
      )}

      {/* Modal Terms - Layer Paling Atas */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[30]">
          <ModalTerms handleAgreeAndPlay={handleAgreeAndPlay} />
        </div>
      )}
    </div>
  );
}