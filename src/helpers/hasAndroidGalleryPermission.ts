import { Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

export async function hasAndroidGalleryPermission() {
  const permission =
    Platform.OS === "android" && Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  const status = await check(permission);
  if (status === RESULTS.GRANTED) {
    return true;
  } else if (status === RESULTS.DENIED) {
    const statusAfterRequest = await request(permission);
    if (statusAfterRequest === RESULTS.GRANTED) {
      return true;
    }
  }
  return false;
}
