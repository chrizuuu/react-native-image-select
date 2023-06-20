import { useCallback, useEffect, useRef, useState } from 'react';
import { SelectedImages } from '../types';
import ImageSelect from '../ImageSelect';

export interface useImageSelectReturned {
  isImageSelectVisible: boolean;
  openImageSelect: () => void;
  onCancel: () => void;
  onDone: (images: SelectedImages) => void;
  selectedImages: SelectedImages;
  onRemoveSelectedImage: (imageUri: string) => void;
  clearSelectedImages: () => void;
}

export function useImageSelect(): useImageSelectReturned {
  const imageSelectRef = useRef<ImageSelect>(null);
  const [isImageSelectVisible, setIsImageSelectVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<SelectedImages>([]);

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
    (newSelectedImages: SelectedImages) => {
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
