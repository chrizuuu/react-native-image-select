import React, { forwardRef, memo } from 'react';
import { ImagePickerContainer } from './components/ImagePickerContainer';
import { ImagePickerContent } from './components/ImagePickerContent';
import { SelectedImage } from './types';
import { ImageSelectorContextHandler } from './context/ImageSelectorContext.type';
import ImageSelectorContext from './context/ImageSelectorContext';

interface ImageSelectorProps {
  onDone: () => void;
  onCancel: () => void;
  isVisible: boolean;
  startIndex?: number;
  callback: (selectedImages: (SelectedImage | undefined)[]) => void;
}

function ImageSelectorComponent() {
  return (
    <ImagePickerContainer>
      <ImagePickerContent />
    </ImagePickerContainer>
  );
}

const ImageSelector = forwardRef<
  ImageSelectorContextHandler,
  ImageSelectorProps
>(({ onDone, onCancel, isVisible, startIndex, callback }, ref) => {
  return (
    <ImageSelectorContext
      ref={ref}
      isVisible={isVisible}
      onDone={onDone}
      onCancel={onCancel}
      startIndex={startIndex}
      callback={callback}
    >
      <ImageSelectorComponent />
    </ImageSelectorContext>
  );
});

export default memo(ImageSelector);
