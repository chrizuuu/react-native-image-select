import React from 'react';
import { useImageSelectProperties } from '../context/ImageSelectContext';
import { Modal } from './Modal/Modal';
import { HeaderCustomizationProps } from 'src/types/customization';

interface ImageSelectContainerProps {
  children: React.ReactNode;
  header?: HeaderCustomizationProps;
}

export function ImageSelectContainer(props: ImageSelectContainerProps) {
  const { isVisible, onCancel, onDone } = useImageSelectProperties();

  return (
    <Modal
      visible={isVisible}
      onClose={onCancel}
      onDone={onDone}
      header={props.header}
    >
      {props.children}
    </Modal>
  );
}
