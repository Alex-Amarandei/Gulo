import { NavbarButtonPaths } from "@/interfaces/navbar-icons";

export const NavbarButtonPathsByRoute: Record<string, NavbarButtonPaths> = {
  "/analytics": {
    analytics: "/images/miscellaneous/analytics-on.png",
    overview: "/images/miscellaneous/overview-off.png",
    reports: "/images/miscellaneous/reports-off.png",
  },
  "/": {
    analytics: "/images/miscellaneous/analytics-off.png",
    overview: "/images/miscellaneous/overview-on.png",
    reports: "/images/miscellaneous/reports-off.png",
  },
  "/reports": {
    analytics: "/images/miscellaneous/analytics-off.png",
    overview: "/images/miscellaneous/overview-off.png",
    reports: "/images/miscellaneous/reports-on.png",
  },
};
