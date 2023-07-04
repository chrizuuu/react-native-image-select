import { useCallback, useMemo } from 'react';
import { Draft } from 'immer';
import { useImmerReducer } from 'use-immer';
import {
  CameraRollPhotosState,
  CameraRollPhotosActions,
  CameraRollPhotosType,
  initialCameraRollState,
} from './useCameraRollState.type';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import { AssetType, SelectedImages } from '../../types';
import { normalizeImagePicker } from './CameraRollState.schema';

const convertCameraRollPicturesToSelectedImageType = (
  edges: PhotoIdentifier[]
): SelectedImages => {
  return edges.map((edge) => {
    return {
      filename: edge.node.image.filename!,
      uri: edge.node.image.uri,
      height: edge.node.image.height,
      width: edge.node.image.width,
      orientation: edge.node.image.orientation,
      type: edge.node.type,
      fileSize: edge.node.image.fileSize,
      extension: edge.node.image.extension,
      playableDuration: edge.node.image.playableDuration,
      selectedPosition: null,
    };
  });
};

export function cameraRollReducer(
  state: Draft<CameraRollPhotosState>,
  action: CameraRollPhotosActions
) {
  switch (action.type) {
    case CameraRollPhotosType.FULFILED:
      if (action.payload.entities.images) {
        Object.entries(action.payload.entities.images).forEach((entry) => {
          state.entities[entry[0]] = entry[1];
        });
      }
      state.ids = state.ids.concat(action.payload.result);
      break;
    case CameraRollPhotosType.FULFILED_IOS_LIBRARY_SELECTION_CHANGED:
      if (action.payload.entities.images) {
        Object.entries(action.payload.entities.images).forEach((entry) => {
          state.entities[entry[0]] = entry[1];
        });
        state.ids = action.payload.result;
      }
      break;
    case CameraRollPhotosType.ON_LIST_LOADED:
      state.hasNextPage = action.payload.hasNextPage;
      state.nextCursor = action.payload.nextCursor;
      break;
    case CameraRollPhotosType.UPDATE_ITEM_SELECTED_POSITION:
      if (state.entities[action.payload.id]) {
        state.entities[action.payload.id]!.selectedPosition =
          action.payload.position;
      }
      break;
  }
}

export function useCameraRollState(assetType?: AssetType) {
  const [cameraRollState, dispatch] = useImmerReducer<
    CameraRollPhotosState,
    CameraRollPhotosActions
  >(cameraRollReducer, initialCameraRollState);

  const cameraRollHandler = useCallback(
    async (withNextCursor: boolean) => {
      const response = await CameraRoll.getPhotos({
        first: 30,
        after: withNextCursor ? cameraRollState.nextCursor : undefined,
        assetType: assetType ?? 'Photos',
        include: [
          'filename',
          'imageSize',
          'orientation',
          'playableDuration',
          'fileSize',
          'fileExtension',
        ],
      });

      const convertedData = convertCameraRollPicturesToSelectedImageType(
        response.edges
      );
      const normalizedData = normalizeImagePicker(convertedData);

      return {
        hasNextPage: response.page_info.has_next_page,
        nextCursor: response.page_info.end_cursor,
        entities: normalizedData.entities,
        result: normalizedData.result,
      };
    },
    [assetType, cameraRollState.nextCursor]
  );

  const loadNextPagePictures = useCallback(async () => {
    const response = await cameraRollHandler(true);

    dispatch({
      type: CameraRollPhotosType.ON_LIST_LOADED,
      payload: {
        hasNextPage: response.hasNextPage,
        nextCursor: response.nextCursor,
      },
    });
    dispatch({
      type: CameraRollPhotosType.FULFILED,
      payload: {
        entities: response.entities,
        result: response.result,
      },
    });
  }, [cameraRollHandler, dispatch]);

  const onIOSLibrarySelectionChange = useCallback(async () => {
    const response = await cameraRollHandler(false);

    dispatch({
      type: CameraRollPhotosType.ON_LIST_LOADED,
      payload: {
        hasNextPage: response.hasNextPage,
        nextCursor: response.nextCursor,
      },
    });

    dispatch({
      type: CameraRollPhotosType.FULFILED_IOS_LIBRARY_SELECTION_CHANGED,
      payload: {
        entities: response.entities,
        result: response.result,
      },
    });
  }, [cameraRollHandler, dispatch]);

  const onEndReached = useCallback(async () => {
    if (cameraRollState.hasNextPage && cameraRollState.nextCursor) {
      await loadNextPagePictures();
    }
  }, [
    cameraRollState.hasNextPage,
    cameraRollState.nextCursor,
    loadNextPagePictures,
  ]);

  const updateItemPositionById = useCallback(
    (id: string, position: number | null) => {
      dispatch({
        type: CameraRollPhotosType.UPDATE_ITEM_SELECTED_POSITION,
        payload: { id: id, position: position },
      });
    },
    [dispatch]
  );

  const getImagesById = useCallback(
    (ids: string[]) => {
      return ids.map((a) => cameraRollState.entities[a]!);
    },
    [cameraRollState.entities]
  );

  const photos = useMemo(
    () => cameraRollState.ids.map((uri) => cameraRollState.entities[uri]!),
    [cameraRollState.ids, cameraRollState.entities]
  );

  return {
    photos: photos,
    photosIds: cameraRollState.ids,
    loadNextPagePictures,
    updateItemPositionById,
    onEndReached,
    getImagesById,
    onIOSLibrarySelectionChange,
  };
}
