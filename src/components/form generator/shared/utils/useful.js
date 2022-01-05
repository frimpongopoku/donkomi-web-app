export const NAME = "____name____";
export const OBJECT_OBJECT = "[object Object]";
export const lowKeyValidation = (props) => {
  const { data, labelFieldName, valueFieldName } = props;
  if (!data)
    console.error(
      "You have not provided any 'data'. 'data' should be an array of [string || object]"
    );
  const anyElem = data[0];

  const elemExistsAndIsObj = anyElem && anyElem.toString() === OBJECT_OBJECT;
  if (elemExistsAndIsObj && !labelFieldName)
    console.error(
      "Provide the 'labeldFieldName' and field if you pass an array of Objects into 'data' "
    );

  if (elemExistsAndIsObj && !valueFieldName)
    console.warn(
      "You did not provide a 'valueFieldName', so your 'labelFieldName' will be used... "
    );
};

export const isArrayOfObjects = (data) => {
  if (!data) return false;
  const one = data[0];
  // Assumption: any json.toString() returns "OBJECT_OBJECT"
  if (one.toString() === OBJECT_OBJECT) return true;
  return false;
};

/**
 *
 * Convert a base64 String back to a file object
 * @param {base64String} base64String
 * @param {String} filename
 * @returns {File} image File Object
 *
 */
export const base64StringtoFile = (base64String, filename) => {
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
