import { Routes } from "@/constants/routes";

export type NavMenuItem = {
  label: string;
  href: string;
};

export const navMenuItems: NavMenuItem[] = [
  // { label: "Intro", href: Routes.INTRO },
  // { label: "Home", href: Routes.HOME },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: Routes.CONTACT },
  { label: "Blog", href: Routes.BLOG },
  { label: "Docs", href: Routes.DOCUMENTATION },
];
