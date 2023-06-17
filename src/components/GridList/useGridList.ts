import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { GridListBaseProps } from './types';

const DEFAULT_ITEM_SPACINGS = 2;

const SCREEN = Dimensions.get('screen');

const useGridList = (props: GridListBaseProps) => {
  const {
    numColumns,
    itemSpacing = DEFAULT_ITEM_SPACINGS,
    listPadding = 0,
  } = props;

  const _containerWidth = useMemo(() => {
    return SCREEN.width - listPadding * 2;
  }, [listPadding]);

  const itemWidth = useMemo(() => {
    return (_containerWidth - itemSpacing * (numColumns - 1)) / numColumns;
  }, [_containerWidth, itemSpacing, numColumns]);

  const itemContainerStyle = useMemo(() => {
    return {
      width: itemWidth /* + itemSpacing */,
      marginRight: itemSpacing,
      marginBottom: itemSpacing,
    };
  }, [itemWidth, itemSpacing]);

  const listContentStyle = useMemo(() => {
    return [{ padding: listPadding }];
  }, [listPadding]);

  return { itemContainerStyle, listContentStyle };
};

export default useGridList;
