import React from 'react';
import { CameraRollReturned } from '../hooks/useImageSelectHandlers';
import { SelectedImage } from '../types';

export interface ImageSelectContextProps {
  onCancel: () => void;
  isVisible: boolean;
  startIndex?: number;
  children: React.ReactNode;
  onDone: (selectedImages: (SelectedImage | undefined)[]) => void;
}

export interface ImageSelectContextHandler {
  handleRemoveSelectedImage: (id: string) => void;
  handleRecalculateIndexOfSelectedImages: () => void;
  handleCreateBackupSelectedImages: () => void;
  handleRestoreSelectedImages: () => void;
  handleClearSelectedImages: () => void;
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
