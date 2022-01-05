export function pop(array, pred) {
  if (!array || !pred) return {};
  var found,
    index,
    rest = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (pred(item)) {
      found = item;
      index = i;
    } else rest.push(item);
  }

  return { found, index, rest };
}

export const NAME = "____name____";
export const OBJECT_OBJECT = "[object Object]";
export const VALUE = "value";
export const LABEL = "label";
export const isArrayOfObjects = (data) => {
  if (!data) return false;
  const one = data[0];
  if (typeof one === "object") return true;
  return false;
};
export const lowKeyValidation = (props) => {
  const { data, valueExtractor, labelExtractor } = props;
  if (!data)
    console.error(
      "You have not provided any 'data'. 'data' should be an array of [string || object]"
    );

  const elemsAreObjs = isArrayOfObjects(data);
  if (elemsAreObjs && !labelExtractor)
    console.error(
      "[labelExtractor] Provide a function that returns parts of the object you would like to display as the checkbox label... "
    );

  if (elemsAreObjs && !valueExtractor)
    console.warn(
      "[vaueExtractor] Provide a function that returns parts of the object you would like to return as value onChange for each checkbox..."
    );
};

/**
 *
 * Convert a base64 String back to a file object
 * @param {base64String} base64String
 * @param {String} filename
 * @returns {File} image File Object
 *
 */
export const base64StringtoFile = (
  base64String,
  filename = "filename-" + getRandomStringKey()
) => {
  var arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const getValueOrLabel = (item, key, props) => {
  const { labelExtractor, valueExtractor, data } = props;
  const isObjects = isArrayOfObjects(data);
  if (key === LABEL && labelExtractor && isObjects) return labelExtractor(item);
  if (key === VALUE && valueExtractor && isObjects) return valueExtractor(item);
  return (item || "...").toString();
};

export const getRandomStringKey = (limit = 9999999) => {
  return Math.random(limit).toString();
};

export const stripItemFromArray = (value, comparisonFieldName, array) => {
  if (!array) return [];
  var rest = [];
  const found = array.filter((item) => {
    var isItem = item[comparisonFieldName] === value;
    if (!isItem) rest.push(item);
    return isItem;
  })[0];

  return [found, rest];
};

export function getPropsArrayFromJsonArray(array, property) {
  if (!array || !property) return [];
  const toGo = [];
  array.forEach((item) => toGo.push(item[property]));
  return toGo;
}
export function getPropsArrayFromJsonArrayAdv(array, modifier) {
  if (!array || !modifier) return [];
  const toGo = [];
  array.forEach((item) => toGo.push(modifier(item)));
  return toGo;
}
