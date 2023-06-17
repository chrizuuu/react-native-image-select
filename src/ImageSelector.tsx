import React, { forwardRef, memo } from 'react';
import { ImageSelectContainer } from './components/ImageSelectContainer';
import { ImageSelectContent } from './components/ImageSelectContent';
import { SelectedImages } from './types';
import { ImageSelectContextHandler } from './context/ImageSelectContext.type';
import ImageSelectContext from './context/ImageSelectContext';

interface ImageSelectorProps {
  onCancel: () => void;
  isVisible: boolean;
  startIndex?: number;
  onDone: (selectedImages: SelectedImages) => void;
}

function ImageSelectorComponent() {
  return (
    <ImageSelectContainer>
      <ImageSelectContent />
    </ImageSelectContainer>
  );
}

const ImageSelector = forwardRef<ImageSelectContextHandler, ImageSelectorProps>(
  ({ onCancel, isVisible, startIndex, onDone }, ref) => {
    return (
      <ImageSelectContext
        ref={ref}
        isVisible={isVisible}
        onCancel={onCancel}
        startIndex={startIndex}
        onDone={onDone}
      >
        <ImageSelectorComponent />
      </ImageSelectContext>
    );
  }
);

export default memo(ImageSelector);
