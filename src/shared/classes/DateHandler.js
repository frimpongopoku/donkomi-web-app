import { formatDistanceToNow, formatRelative } from "date-fns";
// https://date-fns.org/

export default class DateHandler {
  static makeRelativeDate(date) {
    if (!date) return "...";
    return formatRelative(date, Date.now());
  }

  static makeTimeAgo(date) {
    if (!date) return "...";
    if (typeof date === "string") date = new Date(date);
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
