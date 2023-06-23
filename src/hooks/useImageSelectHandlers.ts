import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { cameraRollEventEmitter } from '@react-native-camera-roll/camera-roll';
import { hasIOSGalleryPermission } from '../helpers/hasIOSGalleryPermission';
import { hasAndroidGalleryPermission } from '../helpers/hasAndroidGalleryPermission';
import { isAboveIOS14 } from '../helpers/isAboveIOS14';
import { useCameraRollState } from './useCameraRollState/useCameraRollState';
import { useSelectedImage } from './useSelectedImage/useSelectedImage';
import { SelectedImages } from '../types';
import { NativeEventSubscription } from 'react-native';
import { AppState } from 'react-native';
import { EmitterSubscription } from 'react-native';

export interface CameraRollReturned {
  photos: SelectedImages;
  onEndReached: () => void;
  isReloading: boolean;
  isInitializing: boolean;
  hasCameraRollGranted: boolean;
  handleToggleSelectedImage: (id: string) => void;
  handleRecalculateIndexOfSelectedImages: () => void;
  handleRemoveSelectedImage: (id: string) => void;
  handleCreateBackupSelectedImages: () => void;
  handleRestoreSelectedImages: () => void;
  handleClearSelectedImages: () => void;
  selectedImages: string[];
  getImagesById: (ids: string[]) => SelectedImages;
}

export const useImageSelectHandlers = (
  isVisible: boolean,
  startIndex: number
): CameraRollReturned => {
  const [isReloading, setIsReloading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasCameraRollGranted, setCameraRollGranted] = useState(false);
  const {
    photos,
    photosIds,
    loadNextPagePictures,
    updateItemPositionById,
    onEndReached,
    getImagesById,
    onIOSLibrarySelectionChange,
  } = useCameraRollState(isVisible);
  const {
    handleToggleSelectedImage,
    handleRemoveSelectedImage,
    handleRecalculateIndexOfSelectedImages,
    handleCreateBackupSelectedImages,
    handleRestoreSelectedImages,
    handleClearSelectedImages,
    selectedImages,
  } = useSelectedImage({ updateItemPositionById, startIndex: startIndex });

  const handleCameraRollPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const status = await hasIOSGalleryPermission();
      return setCameraRollGranted(status);
    }
    const status = await hasAndroidGalleryPermission();
    return setCameraRollGranted(status);
  }, []);

  useEffect(() => {
    (async () => {
      if (
        !photosIds.length &&
        isVisible &&
        !isInitializing &&
        hasCameraRollGranted
      ) {
        await loadNextPagePictures();
      }
    })();
  }, [
    loadNextPagePictures,
    photosIds.length,
    isVisible,
    isInitializing,
    hasCameraRollGranted,
  ]);

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (isVisible && isAboveIOS14()) {
      subscription = cameraRollEventEmitter.addListener(
        'onLibrarySelectionChange',
        async () => {
          setIsReloading(true);
          await onIOSLibrarySelectionChange();
          setIsReloading(false);
        }
      );
    }

    return () => {
      if (isAboveIOS14() && subscription) {
        subscription.remove();
      }
    };
  }, [loadNextPagePictures, isVisible, onIOSLibrarySelectionChange]);

  useEffect(() => {
    (async () => {
      if (isVisible) {
        await handleCameraRollPermission();
        setIsInitializing(false);
      }
    })();
  }, [handleCameraRollPermission, isVisible]);

  useEffect(() => {
    let subscription: NativeEventSubscription;
    if (Platform.OS === 'android') {
      subscription = AppState.addEventListener('focus', async () => {
        if (isVisible) {
          await handleCameraRollPermission();
        }
      });
    } else {
      subscription = AppState.addEventListener(
        'change',
        async (nextAppState) => {
          if (nextAppState === 'active') {
            if (isVisible) {
              await handleCameraRollPermission();
            }
          }
        }
      );
    }

    return () => {
      subscription.remove();
    };
  }, [isVisible, handleCameraRollPermission]);

  return {
    onEndReached,
    photos,
    isReloading,
    isInitializing,
    hasCameraRollGranted,
    handleToggleSelectedImage,
    handleRemoveSelectedImage,
    handleRecalculateIndexOfSelectedImages,
    selectedImages,
    getImagesById,
    handleCreateBackupSelectedImages,
    handleRestoreSelectedImages,
    handleClearSelectedImages,
  };
};
