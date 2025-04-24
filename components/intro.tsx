"use client";

import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { SiteSettings } from "@/constants/settings";
import { ModalTerms } from "@/components/modal-terms";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Intro() {
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

        progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 10;
          });
        }, 300);

        const app = new Application(canvas);
        splineRef.current = app;

        await app.load("https://prod.spline.design/oqHYtZFwqq7sElL9/scene.splinecode");
        
        canvas.style.cursor = 'pointer';
        
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

  const fadeOutAudio = () => {
    if (backgroundMusicRef.current) {
      const fadeOutInterval = setInterval(() => {
        if (backgroundMusicRef.current && backgroundMusicRef.current.volume > 0) {
          backgroundMusicRef.current.volume -= 0.05;
        } else {
          if (backgroundMusicRef.current) {
            backgroundMusicRef.current.pause();
            backgroundMusicRef.current.currentTime = 0;
            backgroundMusicRef.current = null;
          }
          clearInterval(fadeOutInterval);
        }
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
        backgroundMusicRef.current = null;
      }
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

      {/* Dark overlay with transition */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-1000 ease-in-out z-30 
          ${isTransitioning ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-sm'}`}
      />

      {/* Interactive Spline scene */}
      <canvas
        id="spline-scene"
        className="absolute top-0 left-0 w-full h-full z-10 [&>div]:hidden"
      ></canvas>

      {/* Loading overlay with progress */}
      {isLoadingSpline && (
        <div className="absolute inset-0 z-40 bg-black/80 flex flex-col items-center justify-center">
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

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pb-20 pt-4 z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <Image
            src="/images/cancercoin-logo.png"
            alt={SiteSettings.title.full}
            className="w-32 h-32 object-contain"
            width={200}
            height={200}
          />
          <Image
            src="/images/cancercoin-text.png"
            alt={SiteSettings.title.full}
            className="w-250 h-15 object-contain"
            width={1000}
            height={180}
          />
          <div className="my-32" />
          <div className="pointer-events-auto">
            <Button 
              className="bg-web3-primary hover:bg-web3-primary/90"
              onClick={fadeOutAudio}
            >
              <Link href="/home" className="flex items-center gap-2 px-8 py-6">
                Start Explore <FaArrowRightLong />
              </Link>
            </Button>
          </div>
          <div className="flex gap-4 pointer-events-auto">
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
                >
                  {social.icon === "FaXTwitter" && (
                    <Twitter className="h-5 w-5" />
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

      {isModalOpen && <ModalTerms handleAgreeAndPlay={handleAgreeAndPlay} />}
    </div>
  );
}
