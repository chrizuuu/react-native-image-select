import React from 'react';
import ImageItem from './ImageItem';
import GridList from './GridList/GridList';
import { useImageSelectorImages } from '../context/ImageSelectorContext';

export function ImagePickerList() {
  const { photos, onEndReached } = useImageSelectorImages();

  return (
    <GridList
      itemSpacing={1}
      listPadding={0}
      numColumns={3}
      data={photos}
      onEndReached={onEndReached}
      onEndReachedThreshold={1.5}
      renderItem={({ item }) => <ImageItem key={item.uri} image={item} />}
    />
  );
}
