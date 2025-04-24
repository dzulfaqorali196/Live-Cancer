"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navMenuItems } from "@/constants/navbar-menus";
import { SiteSettings } from "@/constants/settings";
import { Routes } from "@/constants/routes";
import Image from "next/image";
import AuthMenu from "@/components/auth/auth-menu";
import { AnimatePresence, motion } from "framer-motion";
// import { ConnectWalletButton } from "@/components/wallet/connect-button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        const start = window.pageYOffset;
        const end = element.getBoundingClientRect().top + window.pageYOffset;
        const duration = 1500; // Durasi scroll dalam milliseconds (1.5 detik)
        const startTime = performance.now();

        function animate(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Fungsi easing untuk smooth scroll yang lebih halus
          const easeInOutQuart = (t: number) => 
            t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

          const currentPosition = start + (end - start) * easeInOutQuart(progress);
          window.scrollTo(0, currentPosition);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-web3-darker/80 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link
          href={Routes.HOME}
          className="flex items-center gap-2"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/images/cancercoin-logo.png"
              alt={SiteSettings.title.full}
              className="w-8 h-8 object-contain"
              width={32}
              height={32}
            />
          </div>
          <div className="relative w-24 h-6 block md:hidden lg:block">
            <AnimatePresence mode="wait">
              {!isLogoHovered ? (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute left-0 top-0 w-full h-full"
                >
                  <Image
                    src="/images/cancercoin-text.png"
                    alt={SiteSettings.title.full}
                    className="w-full h-full object-contain"
                    width={96}
                    height={24}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute left-0 top-0 flex items-center h-full"
                >
                  <span className="text-base font-semibold">
                    <span className="text-[#a857ff]">Go</span>{" "}
                    <span className="text-green-600">Home</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="sr-only">{SiteSettings.title.short}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href ?? "#"}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-sm text-muted-foreground hover:text-[#a857ff] transition-all duration-300 relative group transform hover:scale-105"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a857ff] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_#a857ff] group-hover:blur-[1px]"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* <ThemeToggle /> */}
          <Button
            variant="outline"
            className="border-web3-primary text-web3-primary hover:bg-web3-primary/10"
          >
            Connect Wallet
          </Button>
          <AuthMenu />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-web3-dark border-web3-gray">
            <div className="flex flex-col gap-8 mt-8">
              {navMenuItems.map((item, index) => (
                <SheetTrigger key={index} asChild>
                  <Link
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-lg hover:text-[#a857ff] transition-all duration-300 relative group inline-block transform hover:scale-105"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a857ff] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_#a857ff] group-hover:blur-[1px]"></span>
                  </Link>
                </SheetTrigger>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  variant="outline"
                  className="border-web3-primary text-web3-primary hover:bg-web3-primary/10"
                >
                  Connect Wallet
                </Button>
                {/* <ConnectWalletButton /> */}
                <AuthMenu />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
