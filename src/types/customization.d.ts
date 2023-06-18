import { TextStyle } from 'react-native';
import { ViewStyle } from 'react-native';

export interface HeaderCustomizationProps {
  cancelButtonLabelText?: string;
  cancelButtonLabelStyle?: TextStyle;
  title?: string;
  doneButtonLabelText?: string;
  doneButtonStyle?: ViewStyle;
  doneButtonLabelStyle?: TextStyle;
}
