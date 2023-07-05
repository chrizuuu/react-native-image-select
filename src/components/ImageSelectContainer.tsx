import React from "react";
import { useImageSelectContainerContext } from "../context/ImageSelectContext";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { ImageSelectHeader } from "./ImageSelectHeader";

interface ImageSelectContainerProps {
  children: React.ReactNode;
}

export function ImageSelectContainer(props: ImageSelectContainerProps) {
  const { isVisible, onRequestClose } = useImageSelectContainerContext();

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={styles.wrapper}>
        <ImageSelectHeader />
        <View style={styles.childrenContainer}>{props.children}</View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
});
