import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Modal as RNModal, ModalProps } from 'react-native';
import { ModalHeader } from './ModalHeader';
import { SafeAreaView } from 'react-native';

export interface ImagePickerModalProps extends ModalProps {
  onClose: () => void;
  onDone: () => void;
}

export const Modal = ({ onClose, onDone, ...props }: ImagePickerModalProps) => {
  return (
    <RNModal
      visible={props.visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.wrapper}>
        <ModalHeader onClose={onClose} onDone={onDone} />
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
