import {
  faBell,
  faNewspaper,
  faShoppingBag,
  faShoppingBasket,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export const NAV_MENU = [
  // { name: "News", icon: faNewspaper, key: "news", url: "/news" },
  {
    name: "Market Place",
    icon: faShoppingBasket,
    key: "market-place",
    url: "/browse/market-place",
  },
  {
    name: "Shop",
    icon: faShoppingBag,
    key: "shop-management",
    url: "/user/manage/shop-management/shop-listing",
  },
  {
    name: "Notifications",
    icon: faBell,
    key: "notifications",
    // url: "/user/notifications",
  },

  {
    name: "Profile",
    icon: faUserAlt,
    key: "profile",
    url: "/user/control/settings",
  },
];
