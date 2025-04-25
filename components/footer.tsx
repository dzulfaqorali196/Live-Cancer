"use client";

import Link from "next/link";
import { Github, Twitter, DiscIcon as Discord, Linkedin } from "lucide-react";
import { footerMenus } from "@/constants/footer-menus";
import { legalMenuItems } from "@/constants/legal-menus";
import { Routes } from "@/constants/routes";
import { FaRibbon } from "react-icons/fa6";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const socialIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export function Footer() {
  return (
    <motion.footer 
      className="bg-web3-darker border-web3-gray"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container py-12 md:py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
          variants={containerVariants}
        >
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <motion.div variants={logoVariants}>
            <Link href={Routes.HOME} className="flex items-center gap-2 mb-6">
                <motion.div 
                  className="relative w-8 h-8 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                <div className="absolute inset-0 bg-web3-primary rounded-full hover:animate-pulse"></div>
                <span className="text-xl font-bold text-white p-2 z-10">
                  <FaRibbon />
                </span>
                </motion.div>
              <span className="text-xl font-bold">CancerFun</span>
            </Link>
            </motion.div>
            <motion.p 
              className="text-muted-foreground mb-6 max-w-md"
              variants={itemVariants}
            >
              We are the catalyst driving decentralized cancer research.
              CancerFun is a platform for cancer research and development,
              engineered by researchers to accelerate Cancer Focused
              Decentralized Science.
            </motion.p>
            <motion.div 
              className="flex gap-4"
              variants={containerVariants}
            >
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {footerMenus.map((menu, index) => (
            <motion.div 
              key={menu.title}
              variants={itemVariants}
              custom={index}
            >
              <h3 className="font-semibold mb-4">{menu.title}</h3>
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
              >
                {menu.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    variants={itemVariants}
                    custom={linkIndex}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="border-t border-web3-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-sm text-muted-foreground mb-4 md:mb-0"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} CancerFun. All rights reserved.
          </motion.p>
          <motion.div 
            className="flex gap-6"
            variants={containerVariants}
          >
            {legalMenuItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                custom={index}
              >
                <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                {item.label}
              </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
