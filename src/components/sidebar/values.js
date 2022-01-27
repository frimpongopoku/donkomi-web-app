import {
  faCartArrowDown,
  faCog,
  faHome,
  faMotorcycle,
  faQuestion,
  faShoppingBag,
  faShoppingBasket,
  faSignInAlt,
  faSignOutAlt,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "../../firebase/config";

export const MENU = [
  { name: "Home", icon: faHome, key: "home", url: "/home" },
  {
    name: "Market Place",
    icon: faShoppingBasket,
    key: "market-place",
    url: "/browse/market-place",
  },
  {
    name: "Your Cart",
    icon: faCartArrowDown,
    key: "my-cart",
    url: "/user/control/my-cart/show",
  },
  {
    name: "Shop Management",
    icon: faShoppingBag,
    key: "shop-management",
    url: "/user/manage/shop-management/shop-listing",
    locked: true,
  },
  { name: "Merchant", icon: faMotorcycle, key: "merchant", construction: true },
  { name: "Taxi", icon: faTaxi, key: "taxi", construction: true },
  { name: "Help", icon: faQuestion, key: "help" },
  {
    name: "Settings",
    icon: faCog,
    key: "settings",
    url: "/user/control/settings",
    locked: true,
  },
  {
    name: "Logout",
    icon: faSignOutAlt,
    key: "logout",
    onClick: () => signOut(),
  },
];
