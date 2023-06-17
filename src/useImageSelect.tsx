import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageSelectContextHandler } from './context/ImageSelectContext.type';
import { SelectedImage } from './types';

export interface useImageSelectReturned {
  isImageSelectVisible: boolean;
  openImageSelect: () => void;
  onCancel: () => void;
  onDone: (images: (SelectedImage | undefined)[]) => void;
  selectedImages: (SelectedImage | undefined)[];
  onRemoveSelectedImage: (imageUri: string) => void;
  clearSelectedImages: () => void;
}

export function useImageSelect(): useImageSelectReturned {
  const imageSelectRef = useRef<ImageSelectContextHandler>(null);
  const [isImageSelectVisible, setIsImageSelectVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    (SelectedImage | undefined)[]
  >([]);

  const openImageSelect = useCallback(() => {
    setIsImageSelectVisible(true);
    imageSelectRef.current?.handleCreateBackupSelectedImages();
  }, []);

  const closeImageSelect = useCallback(() => {
    setIsImageSelectVisible(false);
  }, []);

  const onCancel = useCallback(() => {
    closeImageSelect();
    imageSelectRef.current?.handleRestoreSelectedImages();
  }, [closeImageSelect]);

  const onRemoveSelectedImage = useCallback((imageUri: string) => {
    imageSelectRef.current?.handleRemoveSelectedImage(imageUri);
  }, []);

  const clearSelectedImages = useCallback(() => {
    imageSelectRef.current?.handleClearSelectedImages();
  }, []);

  const onDone = useCallback(
    (newSelectedImages: (SelectedImage | undefined)[]) => {
      setSelectedImages(newSelectedImages);
      closeImageSelect();
    },
    [closeImageSelect]
  );

  useEffect(() => {
    clearSelectedImages();
  }, [clearSelectedImages]);

  return {
    isImageSelectVisible,
    openImageSelect,
    onCancel,
    onRemoveSelectedImage,
    selectedImages,
    clearSelectedImages,
    onDone,
  };
}
