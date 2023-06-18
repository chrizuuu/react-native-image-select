import {
  PhotoIdentifier,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import { HeaderCustomizationProps } from './customization';

export interface CameraRollReturnedPhoto extends PhotoIdentifier {}

export type CameraRollPageInfo = PhotoIdentifiersPage['page_info'];

export interface SelectedImage {
  uri: string;
  filename: string | null; // Only set if the include parameter contains filename
  extension: string | null; // Only set if the include parameter contains filename
  height: number | null; // Only set if the include parameter contains filename
  width: number | null; // Only set if the include parameter contains filename
  fileSize: number | null; // Only set if the include parameter contains filename
  orientation: number | null; // Adnroid only
  selectedPosition: number | undefined;
}

export type SelectedImages = SelectedImage[];

export interface ImageSelectorProps {
  onCancel: () => void;
  isVisible: boolean;
  startIndex?: number;
  onDone: (selectedImages: SelectedImages) => void;
  header?: HeaderCustomizationProps;
}
