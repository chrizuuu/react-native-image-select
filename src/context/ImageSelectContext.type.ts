import React from "react";
import { ImageSelectProps } from "../types";
import { useImageSelectHandlersReturned } from "../hooks/useImageSelectHandlers";

export interface ImageSelectContextProps extends ImageSelectProps {
  children: React.ReactNode;
}

// Context state
export type ImageSelectContainerContextType = Pick<
  ImageSelectContextProps,
  "isVisible"
> & {
  onRequestClose: () => void;
};

export type ImageSelectHeaderContextType = Pick<
  ImageSelectContextProps,
  "header"
> & {
  onDone: () => void;
  onCancel: () => void;
};

export interface ImageSelectImagesListContextType {
  photos: useImageSelectHandlersReturned["photos"];
  onEndReached: useImageSelectHandlersReturned["onEndReached"];
}

export interface ImageSelectImageItemContextType {
  handleImagePress: (imageUri: string) => void;
}

export type ImageSelectContentStateContextType = Pick<
  useImageSelectHandlersReturned,
  "hasCameraRollGranted" | "isInitializing"
>;

export type ImageSelectNoPermissionPageContextType =
  ImageSelectProps["noPermissionPage"];
