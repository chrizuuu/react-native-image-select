import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { SelectedImages } from "../types";
import ImageSelect from "../ImageSelect";

export interface useImageSelectReturned {
  imageSelectRef: Ref<ImageSelect>;
  isImageSelectVisible: boolean;
  openImageSelect: () => void;
  onCancel: () => void;
  onDone: () => void;
  selectedImages: SelectedImages;
  onRemoveSelectedImage: (imageUri: string) => void;
  clearSelectedImages: () => void;
  callback: (images: SelectedImages) => void;
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

  const onDone = useCallback(() => {
    closeImageSelect();
  }, [closeImageSelect]);

  const onRemoveSelectedImage = useCallback((imageUri: string) => {
    imageSelectRef.current?.handleRemoveSelectedImage(imageUri);
  }, []);

  const clearSelectedImages = useCallback(() => {
    imageSelectRef.current?.handleClearSelectedImages();
  }, []);

  const callback = useCallback((newSelectedImages: SelectedImages) => {
    setSelectedImages(newSelectedImages);
  }, []);

  useEffect(() => {
    clearSelectedImages();
  }, [clearSelectedImages]);

  return {
    imageSelectRef,
    isImageSelectVisible,
    openImageSelect,
    onCancel,
    onRemoveSelectedImage,
    selectedImages,
    clearSelectedImages,
    onDone,
    callback,
  };
}
