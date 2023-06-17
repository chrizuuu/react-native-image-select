import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  ImageSelectorContextProps,
  ImageSelectorContextHandler,
  ImageSelectorImagesProvider,
  ImageSelectorImageItemProvider,
  ImageSelectorStateProvider,
  ImageSelectorPropertiesProvider,
} from './ImageSelectorContext.type';
import { useImageSelectorHandlers } from '../hooks/useImageSelectorHandlers';

const ImageSelectorContextProperties = createContext<
  ImageSelectorPropertiesProvider | undefined
>(undefined);
const ImageSelectorContextState = createContext<
  ImageSelectorStateProvider | undefined
>(undefined);
const ImageSelectorContextImages = createContext<
  ImageSelectorImagesProvider | undefined
>(undefined);
const ImageSelectorContextImageItem = createContext<
  ImageSelectorImageItemProvider | undefined
>(undefined);

const ImageSelectorContext = forwardRef<
  ImageSelectorContextHandler,
  ImageSelectorContextProps
>(({ onDone, onCancel, isVisible, startIndex, children, callback }, ref) => {
  const {
    photos,
    onEndReached,
    isReloading,
    isInitializing,
    hasCameraRollGranted,
    handleToggleSelectedImage,
    handleRemoveSelectedImage,
    handleRecalculateIndexOfSelectedImages,
    handleCreateBackupSelectedImages,
    handleRestoreSelectedImages,
    handleClearSelectedImages,
    selectedImages,
    getImagesById,
  } = useImageSelectorHandlers(isVisible, startIndex ?? 0);

  useEffect(() => {
    callback(getImagesById(selectedImages));
  }, [selectedImages, getImagesById, callback]);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleRemoveSelectedImage,
        handleRecalculateIndexOfSelectedImages,
        handleCreateBackupSelectedImages,
        handleRestoreSelectedImages,
        handleClearSelectedImages,
      };
    },
    [
      handleRemoveSelectedImage,
      handleRecalculateIndexOfSelectedImages,
      handleCreateBackupSelectedImages,
      handleRestoreSelectedImages,
      handleClearSelectedImages,
    ]
  );

  const PropertiesValue = useMemo(
    () => ({
      onDone,
      onCancel,
      isVisible,
    }),
    [isVisible, onCancel, onDone]
  );

  const StateValue = useMemo(
    () => ({
      isReloading,
      isInitializing,
      hasCameraRollGranted,
    }),
    [hasCameraRollGranted, isInitializing, isReloading]
  );

  const ImagesValue = useMemo(
    () => ({
      photos,
      onEndReached,
    }),
    [photos, onEndReached]
  );

  const ImagesItemValue = useMemo(
    () => ({
      handleImagePress: (id: string) => handleToggleSelectedImage(id),
    }),
    [handleToggleSelectedImage]
  );

  return (
    <ImageSelectorContextProperties.Provider value={PropertiesValue}>
      <ImageSelectorContextState.Provider value={StateValue}>
        <ImageSelectorContextImages.Provider value={ImagesValue}>
          <ImageSelectorContextImageItem.Provider value={ImagesItemValue}>
            {children}
          </ImageSelectorContextImageItem.Provider>
        </ImageSelectorContextImages.Provider>
      </ImageSelectorContextState.Provider>
    </ImageSelectorContextProperties.Provider>
  );
});

export function useImageSelectorProperties() {
  const context = useContext(ImageSelectorContextProperties);
  if (context === undefined) {
    throw new Error(
      'useImageSelectorProperties must be used within a ImageSelectorContextProperties'
    );
  }
  return context;
}

export function useImageSelectorState() {
  const context = useContext(ImageSelectorContextState);
  if (context === undefined) {
    throw new Error(
      'useImageSelectorState must be used within a ImageSelectorContextState'
    );
  }
  return context;
}

export function useImageSelectorImages() {
  const context = useContext(ImageSelectorContextImages);
  if (context === undefined) {
    throw new Error(
      'useImageSelectorImages must be used within a ImageSelectorContextImages'
    );
  }
  return context;
}

export function useImageSelectorImageItem() {
  const context = useContext(ImageSelectorContextImageItem);
  if (context === undefined) {
    throw new Error(
      'useImageSelectorImageItem must be used within a ImageSelectorContextImageItem'
    );
  }
  return context;
}

export default ImageSelectorContext;
