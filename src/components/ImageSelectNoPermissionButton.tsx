import React from 'react';
import { Button } from 'react-native';
import { Linking, View, StyleSheet } from 'react-native';
import { Text } from './atomic/Text/Text';

export function ImageSelectNoPermissionButton() {
  return (
    <View style={styles.wrapper}>
      <Text>No permission</Text>
      <Button title={'Get permission'} onPress={() => Linking.openSettings()} />
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
