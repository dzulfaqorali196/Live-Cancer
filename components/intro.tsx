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

    const initializeSpline = async () => {
      try {
        const canvas = document.getElementById("spline-scene") as HTMLCanvasElement;
        if (!canvas) throw new Error("Canvas not found");

        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Prevent unwanted zoom and touch behaviors
        canvas.style.touchAction = 'none';
        
        // Prevent default touch events
        canvas.addEventListener('touchstart', (e) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        }, { passive: false });

        // Prevent zoom on double tap
        let lastTap = 0;
        canvas.addEventListener('touchend', (e) => {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          if (tapLength < 500 && tapLength > 0) {
            e.preventDefault();
          }
          lastTap = currentTime;
        }, { passive: false });

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
        
        // Tambahkan meta viewport untuk mengontrol scaling
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewportMeta);
        
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

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const canvas = document.getElementById("spline-scene") as HTMLCanvasElement;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      }, 250);
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
      if (splineRef.current) {
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
    // Fade out audio dengan smooth
    const audioElements = document.querySelectorAll('audio');
    
    return new Promise<void>((resolve) => {
      const fadeOutInterval = setInterval(() => {
        let allStopped = true;
        
        audioElements.forEach(audio => {
          if (audio instanceof HTMLAudioElement) {
            if (audio.volume > 0) {
              audio.volume = Math.max(0, audio.volume - 0.02); // Lebih halus dengan pengurangan yang lebih kecil
              allStopped = false;
            }
          }
        });

        if (allStopped) {
          clearInterval(fadeOutInterval);
          // Hentikan semua audio setelah fade out selesai
          audioElements.forEach(audio => {
            if (audio instanceof HTMLAudioElement) {
              audio.pause();
              audio.currentTime = 0;
            }
          });
          resolve();
        }
      }, 30); // Interval lebih cepat untuk transisi yang lebih halus
    }).then(() => {
      // Navigasi ke home setelah fade out selesai
      window.location.href = '/home';
    });
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
    <div className="relative w-full h-screen">
      <audio ref={dingSoundRef} preload="auto">
        <source src="/sound/ding.aac" type="audio/aac" />
        Your browser does not support the audio element.
      </audio>

      <audio ref={backgroundMusicRef} loop preload="auto">
        <source src="/sound/backsound.aac" type="audio/aac" />
        Your browser does not support the audio element.
      </audio>

      {/* Base Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pb-20 pt-4 z-[15]">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="relative z-[2]">
            <Image
              src="/images/cancercoin-logo.png"
              alt={SiteSettings.title.full}
              className="w-32 h-32 object-contain"
              width={200}
              height={200}
            />
          </div>
          <div className="relative z-[2]">
            <Image
              src="/images/cancercoin-text.png"
              alt={SiteSettings.title.full}
              className="w-250 h-15 object-contain"
              width={1000}
              height={180}
            />
          </div>
          <div className="my-32" />
          <div 
            className="relative z-[10] w-full max-w-[300px] mx-auto" 
          >
            <Button 
              className="bg-web3-primary hover:bg-web3-primary/90 w-full py-6 md:py-8"
              onClick={handleStartExplore}
            >
              <span className="flex items-center justify-center gap-2 text-base md:text-lg font-medium">
                Start Explore <FaArrowRightLong />
              </span>
            </Button>
          </div>
          <div className="flex gap-4 relative z-[10] mt-4">
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

      {/* Spline Scene */}
      <div 
        className="absolute inset-0 w-full h-screen overflow-hidden" 
        style={{ 
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
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
            touchAction: 'none',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Dark overlay with transition */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-1000 ease-in-out z-[2]
          ${isTransitioning ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-sm'}`}
      />

      {/* Loading overlay */}
      {isLoadingSpline && (
        <div 
          className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-[20]"
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

      {/* Modal Terms */}
      {isModalOpen && (
        <div className="z-[30]">
          <ModalTerms handleAgreeAndPlay={handleAgreeAndPlay} />
        </div>
      )}
    </div>
  );
}