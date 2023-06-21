import React, { forwardRef, memo } from 'react';
import { ImageSelectContainer } from './components/ImageSelectContainer';
import { ImageSelectContent } from './components/ImageSelectContent';
import { ImageSelectMethods, ImageSelectProps } from './types';
import ImageSelectContext from './context/ImageSelectContext';

type ImageSelect = ImageSelectMethods;

const ImageSelectComponent = forwardRef<ImageSelect, ImageSelectProps>(
  ({ onCancel, isVisible, startIndex, onDone, header, callback }, ref) => {
    return (
      <ImageSelectContext
        ref={ref}
        isVisible={isVisible}
        onCancel={onCancel}
        startIndex={startIndex}
        onDone={onDone}
        callback={callback}
      >
        <ImageSelectContainer header={header}>
          <ImageSelectContent />
        </ImageSelectContainer>
      </ImageSelectContext>
    );
  }
);

const ImageSelect = memo(ImageSelectComponent);
ImageSelect.displayName = 'ImageSelect';

export default ImageSelect;
