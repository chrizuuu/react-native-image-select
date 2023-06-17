import React from 'react';
import { useImageSelectProperties } from '../context/ImageSelectContext';
import { Modal } from './Modal/Modal';

interface ImageSelectContainerProps {
  children: React.ReactNode;
}

export function ImageSelectContainer(props: ImageSelectContainerProps) {
  const { isVisible, onCancel, onDone } = useImageSelectProperties();

  return (
    <Modal visible={isVisible} onClose={onCancel} onDone={onDone}>
      {props.children}
    </Modal>
  );
}
