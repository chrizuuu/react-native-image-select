import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Image, View, TouchableOpacity } from 'react-native';
import { useImageSelectorImageItem } from '../context/ImageSelectorContext';
import { SelectedImage } from '../types';
import { Text } from './Text/Text';

interface ImageItemProps {
  image: SelectedImage;
}

const ImageItem = ({ image }: ImageItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { handleImagePress } = useImageSelectorImageItem();

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
    borderColor: '#0165E1',
  },
  checkboxWrapper: { position: 'absolute', top: 10, right: 10, zIndex: 2 },
  checkbox: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  checkboxTrue: { borderColor: '#0165E1', backgroundColor: '#0165E1' },
  checkboxFalse: {
    borderWidth: 2,
    borderColor: 'rgba(245,245,245,0.5)',
  },
  selectedPositionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 10,
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
