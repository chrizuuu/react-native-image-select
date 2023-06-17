import React from 'react';
import { ImageSelectList } from './ImageSelectList';
import { ImageSelectNoPermissionButton } from './ImageSelectNoPermissionButton';
import { useImageSelectState } from '../context/ImageSelectContext';
import { ActivityIndicator } from 'react-native';

export function ImageSelectContent() {
  const { isReloading, isInitializing, hasCameraRollGranted } =
    useImageSelectState();

  return isReloading || isInitializing ? (
    <ActivityIndicator size={48} />
  ) : hasCameraRollGranted ? (
    <ImageSelectList />
  ) : (
    <ImageSelectNoPermissionButton />
  );
}
