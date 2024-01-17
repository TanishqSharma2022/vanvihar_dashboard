import { Icons } from "@/components/icons";

import { NavItem, SidebarNavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Questions",
    href: "/questions",
    icon: "kanban",
    label: "questions",
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },

  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];

export const options = [
  { label: "Elephant", value: "Elephant" },
  { label: "Tiger", value: "Tiger" },
  { label: "Mammals", value: "Mammals" },
  { label: "Herbivore", value: "Herbivore" },
  { label: "Carnivore", value: "Carnivore" },
  { label: "Birds", value: "Birds" },
  { label: "Trees", value: "Trees" },
  { label: "Reptiles", value: "Reptiles" },
  { label: "Butterfly", value: "Butterfly" },
];
