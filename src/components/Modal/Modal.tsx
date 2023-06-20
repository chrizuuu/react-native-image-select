import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Modal as RNModal, ModalProps } from 'react-native';
import { ModalHeader } from './ModalHeader';
import { SafeAreaView } from 'react-native';
import { ImageSelectHeaderCustomizationProps } from '../../types';

export interface ImagePickerModalProps extends ModalProps {
  onClose: () => void;
  onDone: () => void;
  header?: ImageSelectHeaderCustomizationProps;
}

export const Modal = ({ onClose, onDone, ...props }: ImagePickerModalProps) => {
  return (
    <RNModal
      visible={props.visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.wrapper}>
        <ModalHeader onClose={onClose} onDone={onDone} {...props.header} />
        <View style={styles.childrenContainer}>{props.children}</View>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
});
