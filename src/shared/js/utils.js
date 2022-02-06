import { pop } from "../../components/form generator/shared/utils/utils";

export const makeCartSummary = (basket) => {
  var items = 0;
  var price = 0;
  basket.forEach((item) => {
    items += item.qty || 0;
    price =
      Number(price) +
        (Number(item.qty) * Number(item.product.price)).toFixed(2) || 0;
  });
  return { numberOfItems: items, totalPrice: price };
};

export const add = (item, cart, redux) => {
  const old = cart?.shop || [];
  const { found, rest, index } = pop(old, (itm) => itm.product.id === item.id);
  const newItem = { product: item, qty: 1 + (found ? found.qty || 0 : 0) };
  rest.splice(index, 0, newItem);
  redux([...rest]);
};

export const remove = (itemId, removeAll = false, cart, redux) => {
  const { rest, found, index } = pop(
    cart?.shop,
    (itm) => itm.product.id === itemId
  );
  if (removeAll) return redux(rest);

  if (found.qty <= 1) return redux(rest);
  const changed = { ...found, qty: found.qty - 1 };
  rest.splice(index, 0, changed);
  redux(rest);
};

export const getDetailsFromProductOrders = (arr) => {
  var shopString = "",
    image;
  var quantity = 0;
  var totalPrice = 0;
  if (!arr) return {};
  arr.forEach((item, index) => {
    totalPrice += Number(item.total_price);
    quantity += item.quantity;
    if (!shopString) shopString = shopString + item?.product?.name;
    else shopString = shopString + " , " + item?.product?.name;
    if (index === 0) image = item.product?.image;
  });

  return { quantity, shopString, image, totalPrice };
};

export const getDetailsFromMerchantOrders = (arr) => {
  var vendorString = "",
    image,
    campaignName,
    campaignId;
  var totalEstimated = 0;
  if (!arr) return {};
  arr.forEach((item, index) => {
    if (!vendorString) vendorString = item?.vendor?.name;
    else vendorString = vendorString + " , " + item?.vendor?.name;
    totalEstimated += Number(item.estimated_cost);
    if (index === 0) {
      image = item?.vendor?.image;
      campaignName = item?.campaign?.title;
      campaignId = item?.campaign?.id;
    }
  });

  return { vendorString, image, campaignName, campaignId, totalEstimated };
};

export const contentHasChanged = (data, otherObj) => {
  const oldObj = { ...otherObj };
  delete oldObj.id;
  const keys = Object.keys(oldObj || {});
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const old = oldObj[key];
    const current = data[key];
    if (old !== current) return true;
  }
  return false;
};

export default function createImageFromInitials(color, name, size) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Google Sans`;
  context.fillText(getInitials(name), size / 2, size / 2);

  return canvas.toDataURL();
}

function getInitials(name) {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
}
