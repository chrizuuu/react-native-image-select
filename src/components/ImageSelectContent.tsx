import React from "react";
import { ImageSelectList } from "./ImageSelectList";
import { ImageSelectNoPermissionButton } from "./ImageSelectNoPermissionButton";
import { useImageSelectContentStateContext } from "../context/ImageSelectContext";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export function ImageSelectContent() {
  const { isInitializing, hasCameraRollGranted } =
    useImageSelectContentStateContext();

  return isInitializing ? (
    <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : hasCameraRollGranted ? (
    <ImageSelectList />
  ) : (
    <ImageSelectNoPermissionButton />
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
