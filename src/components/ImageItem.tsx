import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Image, View, TouchableOpacity } from 'react-native';
import { useImageSelectImageItemContext } from '../context/ImageSelectContext';
import { SelectedImage } from '../types';
import { Text } from './atomic/Text/Text';

interface ImageItemProps {
  image: SelectedImage;
}

const ImageItem = ({ image }: ImageItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { handleImagePress } = useImageSelectImageItemContext();

  if (!image) {
    return null;
  }

  const isSelected = !!image.selectedPosition;
  return (
    <TouchableOpacity onPress={() => handleImagePress(image.uri!)}>
      <View style={[styles.wrapper]}>
        <View style={styles.checkboxWrapper}>
          <View
            style={[
              styles.checkbox,
              isSelected ? styles.checkboxTrue : styles.checkboxFalse,
            ]}
          >
            {isSelected && (
              <Text style={styles.selectedPositionText}>
                {image.selectedPosition}
              </Text>
            )}
          </View>
        </View>

        <Image
          style={styles.image}
          source={{ uri: image.uri }}
          resizeMode="cover"
          onLoad={() => setIsLoading(false)}
        />
      </View>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={24} />
        </View>
      ) : null}
      {isSelected ? <View style={styles.selectedWrapper} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'center', alignItems: 'center' },
  selectedWrapper: {
    position: 'absolute',
    width: '100%',
    height: 140,
    borderWidth: 3,
    borderColor: '#2979ff',
  },
  checkboxWrapper: { position: 'absolute', top: 10, right: 10, zIndex: 2 },
  checkbox: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  checkboxTrue: { borderColor: '#2979ff', backgroundColor: '#2979ff' },
  checkboxFalse: {
    borderColor: 'rgba(245,245,245,0.5)',
  },
  selectedPositionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
  },
  image: {
    height: 140,
    width: '100%',
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default memo(ImageItem);
