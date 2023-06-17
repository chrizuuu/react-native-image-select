import React from 'react';
import { useImageSelectorProperties } from '../context/ImageSelectorContext';
import { Modal } from './Modal/Modal';

interface ImagePickerContainerProps {
  children: React.ReactNode;
}

export function ImagePickerContainer(props: ImagePickerContainerProps) {
  const { isVisible, onCancel, onDone } = useImageSelectorProperties();

  return (
    <Modal visible={isVisible} onClose={onCancel} onDone={onDone}>
      {props.children}
    </Modal>
  );
}
