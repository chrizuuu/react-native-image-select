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
  ImageSelectImagesListContextType,
  ImageSelectImageItemContextType,
  ImageSelectContentStateContextType,
  ImageSelectContainerContextType,
  ImageSelectHeaderContextType,
} from './ImageSelectContext.type';
import { useImageSelectHandlers } from '../hooks/useImageSelectHandlers';
import { ImageSelectMethods } from '../types';

const ImageSelectContainerContext = createContext<
  ImageSelectContainerContextType | undefined
>(undefined);
const ImageSelectHeaderContext = createContext<
  ImageSelectHeaderContextType | undefined
>(undefined);
const ImageSelectContentStateContext = createContext<
  ImageSelectContentStateContextType | undefined
>(undefined);
const ImageSelectImagesListContext = createContext<
  ImageSelectImagesListContextType | undefined
>(undefined);
const ImageSelectImageItemContext = createContext<
  ImageSelectImageItemContextType | undefined
>(undefined);

const ImageSelectContext = forwardRef<
  ImageSelectMethods,
  ImageSelectContextProps
>(
  (
    { onCancel, isVisible, startIndex, children, onDone, callback, header },
    ref
  ) => {
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

    const ContainerValue = useMemo(
      () => ({
        isVisible,
        onRequestClose: onCancel,
      }),
      [isVisible, onCancel]
    );

    const HeaderValue = useMemo(
      () => ({
        header,
        onDone,
        onCancel,
      }),
      [header, onDone, onCancel]
    );

    const ContentState = useMemo(
      () => ({
        isReloading,
        isInitializing,
        hasCameraRollGranted,
      }),
      [hasCameraRollGranted, isInitializing, isReloading]
    );

    const ImagesListValue = useMemo(
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
      <ImageSelectContainerContext.Provider value={ContainerValue}>
        <ImageSelectHeaderContext.Provider value={HeaderValue}>
          <ImageSelectContentStateContext.Provider value={ContentState}>
            <ImageSelectImagesListContext.Provider value={ImagesListValue}>
              <ImageSelectImageItemContext.Provider value={ImagesItemValue}>
                {children}
              </ImageSelectImageItemContext.Provider>
            </ImageSelectImagesListContext.Provider>
          </ImageSelectContentStateContext.Provider>
        </ImageSelectHeaderContext.Provider>
      </ImageSelectContainerContext.Provider>
    );
  }
);

export function useImageSelectContainerContext() {
  const context = useContext(ImageSelectContainerContext);
  if (context === undefined) {
    throw new Error(
      'useImageSelectContainerContext must be used within a ImageSelectContainerContext'
    );
  }
  return context;
}

export function useImageSelectHeaderContext() {
  const context = useContext(ImageSelectHeaderContext);
  if (context === undefined) {
    throw new Error(
      'useImageSelectHeaderContext must be used within a ImageSelectHeaderContext'
    );
  }
  return context;
}

export function useImageSelectState() {
  const context = useContext(ImageSelectContentStateContext);
  if (context === undefined) {
    throw new Error(
      'useImageSelectState must be used within a ImageSelectContextState'
    );
  }
  return context;
}

export function useImageSelectImagesListContext() {
  const context = useContext(ImageSelectImagesListContext);
  if (context === undefined) {
    throw new Error(
      'useImageSelectImagesListContext must be used within a ImageSelectImagesListContext'
    );
  }
  return context;
}

export function useImageSelectImageItemContext() {
  const context = useContext(ImageSelectImageItemContext);
  if (context === undefined) {
    throw new Error(
      'useImageSelectImageItemContext must be used within a ImageSelectImageItemContext'
    );
  }
  return context;
}

export default ImageSelectContext;
