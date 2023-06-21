import React, {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useEffect,
} from 'react';
import {
  ImageSelectContextProps,
  ImageSelectImagesProvider,
  ImageSelectImageItemProvider,
  ImageSelectStateProvider,
  ImageSelectPropertiesProvider,
} from './ImageSelectContext.type';
import { useImageSelectHandlers } from '../hooks/useImageSelectHandlers';
import { ImageSelectMethods } from '../types';

const ImageSelectContextProperties = createContext<
  ImageSelectPropertiesProvider | undefined
>(undefined);
const ImageSelectContextState = createContext<
  ImageSelectStateProvider | undefined
>(undefined);
const ImageSelectContextImages = createContext<
  ImageSelectImagesProvider | undefined
>(undefined);
const ImageSelectContextImageItem = createContext<
  ImageSelectImageItemProvider | undefined
>(undefined);

const ImageSelectContext = forwardRef<
  ImageSelectMethods,
  ImageSelectContextProps
>(({ onCancel, isVisible, startIndex, children, onDone, callback }, ref) => {
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
  } = useImageSelectHandlers(isVisible, startIndex ?? 0);

  useEffect(() => {
    callback(getImagesById(selectedImages));
  }, [callback, getImagesById, selectedImages]);

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
    <ImageSelectContextProperties.Provider value={PropertiesValue}>
      <ImageSelectContextState.Provider value={StateValue}>
        <ImageSelectContextImages.Provider value={ImagesValue}>
          <ImageSelectContextImageItem.Provider value={ImagesItemValue}>
            {children}
          </ImageSelectContextImageItem.Provider>
        </ImageSelectContextImages.Provider>
      </ImageSelectContextState.Provider>
    </ImageSelectContextProperties.Provider>
  );
});

export function useImageSelectProperties() {
  const context = useContext(ImageSelectContextProperties);
  if (context === undefined) {
    throw new Error(
      'useImageSelectProperties must be used within a ImageSelectContextProperties'
    );
  }
  return context;
}

export function useImageSelectState() {
  const context = useContext(ImageSelectContextState);
  if (context === undefined) {
    throw new Error(
      'useImageSelectState must be used within a ImageSelectContextState'
    );
  }
  return context;
}

export function useImageSelectImages() {
  const context = useContext(ImageSelectContextImages);
  if (context === undefined) {
    throw new Error(
      'useImageSelectImages must be used within a ImageSelectContextImages'
    );
  }
  return context;
}

export function useImageSelectImageItem() {
  const context = useContext(ImageSelectContextImageItem);
  if (context === undefined) {
    throw new Error(
      'useImageSelectImageItem must be used within a ImageSelectContextImageItem'
    );
  }
  return context;
}

export default ImageSelectContext;
