function randomDate(start = new Date(2018, 0, 1), end = new Date()) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const DEFAULT_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomCharFromAlphabet(alphabet) {
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generateFakeWord(wordlength = 7, alphabet = DEFAULT_ALPHABET) {
  return Array.from({ length: wordlength })
    .map(() => {
      return getRandomCharFromAlphabet(alphabet);
    })
    .join("");
}

const makeShop = () => {
  return {
    id: generateFakeWord(14),
    name: generateFakeWord(8),
    image: `https://picsum.photos/200/300?random=${generateFakeWord(3)}/`,
    description: [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 8]
      .map((itm) => generateFakeWord(6))
      .join(" "),
  };
};

const SIZES = {
  l: "large",
  m: "medium",
  s: "small",
};
const makeShopItem = () => {
  return {
    id: generateFakeWord(14),
    name: generateFakeWord(8),
    price: Number(generateFakeWord(4, "0123456789")),
    size: SIZES[getRandomCharFromAlphabet("lms")],
    variation: generateFakeWord(5),
    image: `https://picsum.photos/200/300?random=${generateFakeWord(3)}/`,
    created_at: randomDate(),
    shop: makeShop(),
  };
};

export const generateMarketContent = () => {
  return [1, 2, 3, 4, 3, 4, 5, 6, 7, 5, 4, 3].map((i) => makeShopItem());
};
