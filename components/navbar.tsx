"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navMenuItems } from "@/constants/navbar-menus";
import { SiteSettings } from "@/constants/settings";
import { Routes } from "@/constants/routes";
import Image from "next/image";
import AuthMenu from "@/components/auth/auth-menu";

const navVariants = {
  hidden: {
    y: -20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    y: -10,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    onScroll(); // Check initial scroll position
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Efek untuk menangani scroll ke section setelah navigasi
  React.useEffect(() => {
    function scrollToSection() {
      if (pathname === '/home' && window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          // Pertama scroll ke atas halaman
          window.scrollTo({ top: 0, behavior: 'auto' });

          // Scroll ke target section setelah delay
          const timeoutId = window.setTimeout(() => {
            const yOffset = -100; // Offset untuk navbar
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 800);

          return () => window.clearTimeout(timeoutId);
        }
      }
    }

    scrollToSection();
  }, [pathname]);

  const handleSmoothScroll = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      if (pathname !== '/home') {
        // Reset scroll position dan navigasi ke home dengan hash
        window.scrollTo({ top: 0, behavior: 'auto' });
        router.push(`/home#${targetId}`);
      } else {
        // Jika sudah di home, langsung scroll
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -100; // Offset untuk navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    } else {
      router.push(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (pathname === '/home') {
      // Jika sudah di home, smooth scroll ke atas
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Jika di halaman lain, navigasi ke home dulu
      window.scrollTo({ top: 0, behavior: 'auto' });
      router.push('/home');
    }
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-web3-darker/80 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <motion.div variants={itemVariants}>
        <Link
          href={Routes.HOME}
          className="flex items-center gap-2"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onClick={handleLogoClick}
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
          <div className="relative w-24 h-6 block md:hidden lg:block overflow-hidden">
                <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ 
                opacity: isLogoHovered ? 0 : 1,
                y: isLogoHovered ? -20 : 0
              }}
              transition={{ duration: 0.2 }}
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
                <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isLogoHovered ? 1 : 0,
                y: isLogoHovered ? 0 : 20
              }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-0 w-full h-full flex items-center justify-start text-lg font-semibold"
            >
              <span className="text-[#a857ff]">Go</span>
              <span className="mx-1"> </span>
              <span className="text-green-500">Home</span>
                </motion.div>
          </div>
          <span className="sr-only">{SiteSettings.title.short}</span>
        </Link>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="hidden md:flex items-center gap-8"
        >
          {navMenuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
            >
              <Link
              href={item.href ?? "#"}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-sm text-muted-foreground hover:text-[#a857ff] transition-all duration-300 relative group transform hover:scale-105"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a857ff] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_#a857ff] group-hover:blur-[1px]"></span>
            </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="hidden md:flex items-center gap-4">
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
                <AuthMenu />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
