import { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { ImageSelectorContextHandler } from './context/ImageSelectorContext.type';
import { SelectedImage } from './types';

interface useImageSelectorProps {
  currentImages?: SelectedImage[];
}

export interface useImageSelectorRetunred {
  isImagePickerVisible: boolean;
  openImagePicker: () => void;
  closeImagePicker: () => void;
  onCancelSelectImages: () => void;
  // onRemoveGalleryImage: (uploadedPhotosId: string) => void;
  // galleryImages: SelectedImage[];
  selectedImages: SelectedImage[];
  onRemoveSelectedImage: (imageUri: string) => void;
  clearSelectedImages: () => void;
  imagePickerRef: Ref<ImageSelectorContextHandler>;
  onSelectionChange: (images: SelectedImage[]) => void;
}

export function useImageSelector({}: useImageSelectorProps): useImageSelectorRetunred {
  const imagePickerRef = useRef<ImageSelectorContextHandler>(null);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const onSelectionChange = useCallback(
    (newSelectedImages: SelectedImage[]) => {
      setSelectedImages(newSelectedImages);
    },
    []
  );

  const openImagePicker = useCallback(() => {
    setIsImagePickerVisible(true);
    imagePickerRef.current?.handleCreateBackupSelectedImages();
  }, []);

  const closeImagePicker = useCallback(() => {
    setIsImagePickerVisible(false);
  }, []);

  const onCancelSelectImages = useCallback(() => {
    closeImagePicker();
    imagePickerRef.current?.handleRestoreSelectedImages();
  }, [closeImagePicker]);

  const onRemoveSelectedImage = useCallback((imageUri: string) => {
    imagePickerRef.current?.handleRemoveSelectedImage(imageUri);
  }, []);

  const clearSelectedImages = useCallback(() => {
    imagePickerRef.current?.handleClearSelectedImages();
  }, []);

  useEffect(() => {
    clearSelectedImages();
  }, [clearSelectedImages]);

  return {
    isImagePickerVisible,
    openImagePicker,
    closeImagePicker,
    onCancelSelectImages,
    onRemoveSelectedImage,
    selectedImages,
    clearSelectedImages,
    imagePickerRef,
    onSelectionChange,
  };
}
