import React from 'react';
import ImageItem from './ImageItem';
import GridList from './atomic/GridList/GridList';
import { useImageSelectImagesListContext } from '../context/ImageSelectContext';

export function ImageSelectList() {
  const { photos, onEndReached } = useImageSelectImagesListContext();

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
