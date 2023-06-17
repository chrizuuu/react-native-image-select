import React from 'react';
import { Button } from 'react-native';
import { Linking, View, StyleSheet } from 'react-native';
import { Text } from './Text/Text';

export function ImagePickerNoPermissionButton() {
  return (
    <View style={styles.wrapper}>
      <Text>No permission</Text>
      <Button title={'get permission'} onPress={() => Linking.openSettings()} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
