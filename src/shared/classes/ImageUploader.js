// import storage from "@react-native-firebase/storage";
// import firebase from "@react-native-firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";

// npm i @firebase/storage --> You need to install this before you can use
// https://firebase.google.com/docs/storage/web/upload-files --> Where to find the documentation
const STATE_CHANGED = "state_changed";
const storage = getStorage();
const makeError = (message) => {
  return { pass: false, error: message };
};
export default class FirebaseImageUploader {
  static PROFILE_PHOTOS = "Profile Photos";
  static SHOP_PHOTO_BUCKET = "Shop Cover Photos";
  static PRODUCT_BUCKET = "Product Photos";
  static VENDOR_BUCKET = "Vendor Photos";
  static STOCK_BUCKET = "Stock Photos";
  static uploadImageToFirebase(bucket, image, onComplete, onError, inProgress) {
    if (!bucket || !image)
      return onError ? onError("Provide a bucket name, and an image") : null;
    const reference = ref(storage, `${bucket}/${Date.now()}`);
    const task = uploadBytesResumable(reference, image, {
      contentType: "image/jpeg",
    });
    task.on(
      STATE_CHANGED,
      (snap) => inProgress && inProgress(snap),
      (error) => onError && onError(error),
      () =>
        getDownloadURL(task.snapshot.ref)
          .then((url) => onComplete && onComplete(url))
          .catch((e) => onError(e?.toString()))
    );
  }

  static uploadProfilePhoto(image, onComplete, onError, inProgress) {
    return FirebaseImageUploader.uploadImageToFirebase(
      FirebaseImageUploader.PROFILE_PHOTOS,
      image,
      onComplete,
      onError,
      inProgress
    );
  }

  static deleteImageFromStorage(imageURL, cb) {
    const reference = ref(storage, imageURL);
    deleteObject(reference)
      .then(() => cb && cb())
      .catch((e) => cb && cb(null, e?.toString()));
  }
}
