import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../Text/Text';
import { ImageSelectHeaderCustomizationProps } from '../../types';

interface ModalHeaderProps extends ImageSelectHeaderCustomizationProps {
  onClose: () => void;
  onDone: () => void;
}

export function ModalHeader({ onClose, onDone, ...props }: ModalHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.sideComponent, styles.leftComponent]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={props.cancelButtonLabelStyle}>
            {props.cancelButtonLabelText ?? 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainComponent}>
        <Text numberOfLines={1} style={styles.text}>
          {props.title ?? 'Select images'}
        </Text>
      </View>
      <View style={[styles.sideComponent, styles.rightComponent]}>
        <TouchableOpacity
          style={props.doneButtonStyle ?? styles.doneButton}
          onPress={onDone}
        >
          <Text style={props.doneButtonLabelStyle ?? styles.doneButtonLabel}>
            {props.doneButtonLabelText ?? 'Done'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 54,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
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

  doneButton: {
    backgroundColor: '#2979ff',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  doneButtonLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
