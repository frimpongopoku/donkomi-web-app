import {
  faCog,
  faHome,
  faMotorcycle,
  faQuestion,
  faShoppingBag,
  faShoppingBasket,
  faSignOutAlt,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

export const MENU = [
  { name: "Home", icon: faHome, key: "home" },
  { name: "Market Place", icon: faShoppingBasket, key: "market-place" },
  { name: "Shop Management", icon: faShoppingBag, key: "shop-management" },
  { name: "Merchant", icon: faMotorcycle, key: "merchant", locked: true },
  { name: "Taxi", icon: faTaxi, key: "taxi", locked: true },
  { name: "Help", icon: faQuestion, key: "help" },
  { name: "Settings", icon: faCog, key: "settings" },
  { name: "Logout", icon: faSignOutAlt, key: "logout" },
];
