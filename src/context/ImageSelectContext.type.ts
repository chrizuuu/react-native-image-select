import React from 'react';
import { SelectedImages } from '../types';
import { CameraRollReturned } from '../hooks/useImageSelectHandlers';

export interface ImageSelectContextProps {
  onCancel: () => void;
  isVisible: boolean;
  startIndex?: number;
  children: React.ReactNode;
  onDone: (selectedImages: SelectedImages) => void;
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
