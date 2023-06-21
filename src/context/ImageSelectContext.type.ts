import React from 'react';
import { ImageSelectProps } from '../types';
import { CameraRollReturned } from '../hooks/useImageSelectHandlers';

export interface ImageSelectContextProps {
  onDone: ImageSelectProps['onDone'];
  onCancel: ImageSelectProps['onCancel'];
  isVisible: ImageSelectProps['isVisible'];
  startIndex?: ImageSelectProps['startIndex'];
  children: React.ReactNode;
  callback: ImageSelectProps['callback'];
}

export interface ImageSelectImagesProvider {
  photos: CameraRollReturned['photos'];
  onEndReached: CameraRollReturned['onEndReached'];
}

export interface ImageSelectImageItemProvider {
  handleImagePress: (imageUri: string) => void;
}

export type ImageSelectStateProvider = Pick<
  CameraRollReturned,
  'hasCameraRollGranted' | 'isInitializing' | 'isReloading'
>;

export type ImageSelectPropertiesProvider = Pick<
  ImageSelectContextProps,
  'isVisible' | 'onCancel'
> & {
  onDone: () => void;
};
