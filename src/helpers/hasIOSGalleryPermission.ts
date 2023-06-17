import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const hasIOSGalleryPermission = async () => {
  const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
    return true;
  } else if (status === RESULTS.DENIED) {
    const statusAfterRequest = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (
      statusAfterRequest === RESULTS.GRANTED ||
      statusAfterRequest === RESULTS.LIMITED
    ) {
      return true;
    }
  }
  return false;
};
