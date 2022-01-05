import {
  faCog,
  faHome,
  faMotorcycle,
  faQuestion,
  faShoppingBasket,
  faSignOutAlt,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

export const MENU = [
  { name: "Home", icon: faHome, key: "home" },
  { name: "Market Place", icon: faShoppingBasket, key: "market-place" },
  { name: "Merchant", icon: faMotorcycle, key: "merchant" },
  { name: "Taxi", icon: faTaxi, key: "taxi" },
  { name: "Help", icon: faQuestion, key: "help" },
  { name: "Settings", icon: faCog, key: "settings" },
  { name: "Logout", icon: faSignOutAlt, key: "logout" },
];
