import React from 'react';
import { CameraRollReturned } from '../hooks/useImageSelectorHandlers';
import { SelectedImage } from '../types';

export interface ImageSelectorContextProps {
  onDone: () => void;
  onCancel: () => void;
  isVisible: boolean;
  startIndex?: number;
  children: React.ReactNode;
  callback: (selectedImages: (SelectedImage | undefined)[]) => void;
}

export interface ImageSelectorContextHandler {
  handleRemoveSelectedImage: (id: string) => void;
  handleRecalculateIndexOfSelectedImages: () => void;
  handleCreateBackupSelectedImages: () => void;
  handleRestoreSelectedImages: () => void;
  handleClearSelectedImages: () => void;
}

export interface ImageSelectorImagesProvider {
  photos: CameraRollReturned['photos'];
  onEndReached: CameraRollReturned['onEndReached'];
}

export interface ImageSelectorImageItemProvider {
  handleImagePress: (imageUri: string) => void;
}

export type ImageSelectorStateProvider = Pick<
  CameraRollReturned,
  'hasCameraRollGranted' | 'isInitializing' | 'isReloading'
>;

export type ImageSelectorPropertiesProvider = Pick<
  ImageSelectorContextProps,
  'isVisible' | 'onCancel' | 'onDone'
>;
