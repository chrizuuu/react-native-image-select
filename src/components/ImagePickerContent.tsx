import React from 'react';
import { ImagePickerList } from './ImagePickerList';
import { ImagePickerNoPermissionButton } from './ImagePickerNoPermissionButton';
import { useImageSelectorState } from '../context/ImageSelectorContext';
import { ActivityIndicator } from 'react-native';

export function ImagePickerContent() {
  const { isReloading, isInitializing, hasCameraRollGranted } =
    useImageSelectorState();

  return isReloading || isInitializing ? (
    <ActivityIndicator size={48} />
  ) : hasCameraRollGranted ? (
    <ImagePickerList />
  ) : (
    <ImagePickerNoPermissionButton />
  );
}
