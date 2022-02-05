import {
  faHandshake,
  faSignOutAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import NotificationConstants from "../../shared/classes/NotificationConstants";

export const CONTROLS = [
  { name: "Edit Profile", icon: faUserAlt, url:"/update-my-profile" },
  {
    name: "Apply To Earn On Donkomi",
    icon: faHandshake,
    underConstruction: true,
  },
  { name: "Sign Out", icon: faSignOutAlt },
];

export const TOGGLES = [
  {
    title: "Food Notifications",
    key: "food-sub",
    desc: "Receive notifications when food vendors are done cooking",
    topic: NotificationConstants.Topics.FoodActivity,
  },
  {
    title: "Merchant Notifications",
    key: "merch-sub",
    desc: "Receive notifications when merchants send updates about your order or a campaign",
    topic: NotificationConstants.Topics.MerchantActivity,
  },
  {
    title: "News Broadcasting Notifications",
    key: "news-sub",
    desc: "Receive notifications when important messages are sent by admins",
    topic: NotificationConstants.Topics.NewsBroadcasting,
  },
  {
    title: "Shop Related Notifications",
    key: "shop-sub",
    desc: "Receive notifications when your order status changes",
    topic: NotificationConstants.Topics.ShoppingActivity,
  },
  {
    title: "Messaging Notifications",
    key: "messaging-sub",
    desc: "Receive notifications when shop owners or merchants sends you a direct message about your order",
    topic: NotificationConstants.Topics.MessagingActivity,
  },
  {
    key: "other-sub",
    title: "Other Non Categorised Notifications",
    desc: "Receive notifications on hot deals, promotions and new changes about the application",
    topic: NotificationConstants.Topics.MiscellaneousActivity,
  },
];
