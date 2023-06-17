import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import useGridList from './useGridList';
import { GridListProps } from './types';

const DEFAULT_NUM_COLUMNS = 3;

function GridList(props: GridListProps) {
  const {
    renderItem,
    numColumns = DEFAULT_NUM_COLUMNS,
    itemSpacing,
    listPadding = 0,
    ...others
  } = props;

  const { itemContainerStyle, listContentStyle } = useGridList({
    numColumns,
    itemSpacing,
    listPadding,
  });

  const _renderItem = useCallback(
    (...args: any[]) => {
      // @ts-expect-error
      return <View style={itemContainerStyle}>{renderItem?.(...args)}</View>;
    },
    [renderItem, itemContainerStyle]
  );

  return (
    <FlatList
      {...others}
      numColumns={numColumns}
      contentContainerStyle={listContentStyle}
      onEndReachedThreshold={0.4}
      renderItem={_renderItem}
    />
  );
}

export default GridList;
