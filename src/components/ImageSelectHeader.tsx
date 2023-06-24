import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './atomic/Text/Text';
import { useImageSelectHeaderContext } from 'src/context/ImageSelectContext';

export function ImageSelectHeader() {
  const { onCancel, onDone, header } = useImageSelectHeaderContext();
  return (
    <View style={styles.wrapper}>
      <View style={[styles.sideComponent, styles.leftComponent]}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={header?.cancelButtonLabelStyle}>
            {header?.cancelButtonLabelText ?? 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainComponent}>
        <Text numberOfLines={1} style={styles.title}>
          {header?.title ?? 'Select images'}
        </Text>
      </View>
      <View style={[styles.sideComponent, styles.rightComponent]}>
        <TouchableOpacity
          style={header?.doneButtonStyle ?? styles.doneButton}
          onPress={onDone}
        >
          <Text style={header?.doneButtonLabelStyle ?? styles.doneButtonLabel}>
            {header?.doneButtonLabelText ?? 'Done'}
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
  title: {
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
