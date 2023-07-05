import React from "react";
import { Button } from "react-native";
import { Linking, View, StyleSheet } from "react-native";
import { Text } from "./atomic/Text/Text";
import { useImageSelectNoPermissionPageContext } from "../context/ImageSelectContext";

export function ImageSelectNoPermissionButton() {
  const { noPermissionTitle, getPermissionLabelText } =
    useImageSelectNoPermissionPageContext();
  return (
    <View style={styles.wrapper}>
      <Text>{noPermissionTitle ?? "No permission"}</Text>
      <Button
        title={getPermissionLabelText ?? "Get permission"}
        onPress={() => Linking.openSettings()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
