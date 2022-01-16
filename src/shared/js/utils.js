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
  console.log("JE SUIS LE PRICE", price);
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
