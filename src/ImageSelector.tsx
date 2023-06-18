import React, { forwardRef, memo } from 'react';
import { ImageSelectContainer } from './components/ImageSelectContainer';
import { ImageSelectContent } from './components/ImageSelectContent';
import { ImageSelectorProps } from './types';
import { ImageSelectContextHandler } from './context/ImageSelectContext.type';
import ImageSelectContext from './context/ImageSelectContext';

interface ImageSelectorComponentProps {
  header: ImageSelectorProps['header'];
}

function ImageSelectorComponent({ header }: ImageSelectorComponentProps) {
  return (
    <ImageSelectContainer header={header}>
      <ImageSelectContent />
    </ImageSelectContainer>
  );
}

const ImageSelector = forwardRef<ImageSelectContextHandler, ImageSelectorProps>(
  ({ onCancel, isVisible, startIndex, onDone, header }, ref) => {
    return (
      <ImageSelectContext
        ref={ref}
        isVisible={isVisible}
        onCancel={onCancel}
        startIndex={startIndex}
        onDone={onDone}
      >
        <ImageSelectorComponent header={header} />
      </ImageSelectContext>
    );
  }
);

export default memo(ImageSelector);
