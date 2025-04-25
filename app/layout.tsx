import type React from "react";
import "@/styles/fonts/neue-montreal/stylesheet.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import SessionWrapper from "@/components/auth/session-wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteSettings } from "@/constants/settings";
// import { AppWalletProvider } from "@/components/wallet/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cancerfun.fun"),
  title: {
    absolute: "CancerFun",
    default: "CancerFun"
  },
  description: SiteSettings.description,
  icons: {
    icon: [
      {
        url: "/images/cancercoin-logo.png",
        href: "/images/cancercoin-logo.png"
      }
    ]
  },
  openGraph: {
    title: "CancerFun",
    description: SiteSettings.description,
    url: "https://cancerfun.fun",
    siteName: "CancerFun"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <title>CancerFun</title>
        <link rel="icon" href="/images/cancercoin-logo.png" />
      </head>
      <body
        className="min-h-screen bg-black font-sans antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <SessionWrapper session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* <AppWalletProvider> */}
            {children}
            {/* </AppWalletProvider> */}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
