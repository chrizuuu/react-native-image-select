import { FlatListProps } from 'react-native';

export interface GridListBaseProps {
  /**
   * Number of items to show in a row (ignored when passing maxItemWidth)
   */
  numColumns: number;
  /**
   * Spacing between each item
   */
  itemSpacing?: number;
  /**
   * List padding (used for item size calculation)
   */
  listPadding?: number;
}

export type GridListProps<T = any> = GridListBaseProps & FlatListProps<T>;
