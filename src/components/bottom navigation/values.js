import {
  faBell,
  faNewspaper,
  faShoppingBasket,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export const NAV_MENU = [
  { name: "News", icon: faNewspaper, key: "news", url: "/news" },
  {
    name: "Market Place",
    icon: faShoppingBasket,
    key: "market-place",
    url: "/market-place",
  },
  {
    name: "Notifications",
    icon: faBell,
    key: "notifications",
    url: "/user/notifications",
  },
  { name: "Profile", icon: faUserAlt, key: "profile", url: "/user/profile" },
];
