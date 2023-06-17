import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../Text/Text';

interface ModalHeaderProps {
  onClose: () => void;
  onDone: () => void;
}

export function ModalHeader({ onClose, onDone }: ModalHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.sideComponent, styles.leftComponent]}>
        <TouchableOpacity onPress={onClose}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainComponent}>
        <Text numberOfLines={1} style={styles.text}>
          Select images
        </Text>
      </View>
      <View style={[styles.sideComponent, styles.rightComponent]}>
        <TouchableOpacity onPress={onDone}>
          <Text style={styles.doneBtnLabel}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 54,
    flexDirection: 'row',
  },
  sideComponent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  leftComponent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  rightComponent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  mainComponent: {
    marginHorizontal: 16,
    justifyContent: 'center',
    flex: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  doneBtnLabel: {
    color: '#2979ff',
  },
});
