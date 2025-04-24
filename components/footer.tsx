import Link from "next/link";
import { Github, Twitter, DiscIcon as Discord, Linkedin } from "lucide-react";
import { footerMenus } from "@/constants/footer-menus";
import { legalMenuItems } from "@/constants/legal-menus";
import { Routes } from "@/constants/routes";
import { FaRibbon } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-web3-darker border-t border-web3-gray">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href={Routes.HOME} className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-web3-primary rounded-full hover:animate-pulse"></div>
                <span className="text-xl font-bold text-white p-2 z-10">
                  <FaRibbon />
                </span>
              </div>
              <span className="text-xl font-bold">CancerFun</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              We are the catalyst driving decentralized cancer research.
              CancerFun is a platform for cancer research and development,
              engineered by researchers to accelerate Cancer Focused
              Decentralized Science.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {footerMenus.map((menu) => (
            <div key={menu.title}>
              <h3 className="font-semibold mb-4">{menu.title}</h3>
              <ul className="space-y-3">
                {menu.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-web3-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} CancerFun. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
