import { TextStyle } from 'react-native';
import { ViewStyle } from 'react-native';
import {
  PhotoIdentifier,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';

// methods
export interface ImageSelectMethods {
  /**
   * Remove image from selected images by id (uri).
   * @param id uri of selected image to remove.
   */
  handleRemoveSelectedImage: (id: string) => void;
  /**
   * Recalculate index of selected images
   */
  handleRecalculateIndexOfSelectedImages: () => void;
  /**
   * Create backup of current selected images
   * E.g. if you want to provide a function to cancel selected images and restore them to their previous version
   */
  handleCreateBackupSelectedImages: () => void;
  /**
   * Restore saved list of selected images
   * For example, if you want to provide a function to cancel selected images and restore them to their previous version
   */
  handleRestoreSelectedImages: () => void;
  /**
   * Clear the list of selected photos
   */
  handleClearSelectedImages: () => void;
}

// props
export interface ImageSelectProps {
  /**
   * Callback to be fired when the user closes the image select
   *
   * @type () => void;
   */
  onCancel: () => void;
  /**
   * Show/hide image select
   *
   * @type boolean;
   */
  isVisible: boolean;
  /**
   * Initial position index of the selected images
   * @type number
   * @default 0
   */
  startIndex?: number;
  /**
   * Callback triggered when the user approves the selected images
   *
   * @type (selectedImages:SelectedImages) => void;
   */
  onDone: (selectedImages: SelectedImages) => void;
  /**
   * Props used to customize the header
   *
   * @type ImageSelectHeaderCustomizationProps;
   */
  header?: ImageSelectHeaderCustomizationProps;
}

// other
export interface ImageSelectHeaderCustomizationProps {
  /**
   * Label of cancel/close button
   * @type string
   * @default "Cancel".
   */
  cancelButtonLabelText?: string;
  /**
   * Label style of cancel button
   * @type TextStyle
   * @default .
   */
  cancelButtonLabelStyle?: TextStyle;
  /**
   * Text displayed in header of Image Select
   * @type string
   * @default "Select images"
   * @todo in future it will be remove, because center component in header would be replacemnt with picker to change of current folder
   */
  title?: string;
  /**
   * Label of done button
   * @type string
   * @default "Done".
   */
  doneButtonLabelText?: string;
  /**
   * Style of done button
   * @type ViewStyle
   * @default .
   */
  doneButtonStyle?: ViewStyle;
  /**
   * Label style of done button
   * @type TextStyle
   * @default .
   */
  doneButtonLabelStyle?: TextStyle;
}
export interface SelectedImage {
  uri: string;
  filename: string | null;
  extension: string | null;
  height: number | null;
  width: number | null;
  fileSize: number | null;
  orientation: number | null; // Android only
  selectedPosition: number | null;
  playableDuration: number | null;
}

export type SelectedImages = SelectedImage[];

export interface CameraRollReturnedPhoto extends PhotoIdentifier {}

export type CameraRollPageInfo = PhotoIdentifiersPage['page_info'];
