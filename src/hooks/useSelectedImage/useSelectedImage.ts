import { useImmerReducer } from 'use-immer';
import {
  SelectedImageActions,
  SelectedImageState,
  SelectedImageType,
} from './useSelectedImage.type';
import { Draft } from 'immer';
import { useCallback, useEffect } from 'react';

export function selectedImageReducer(
  state: Draft<SelectedImageState>,
  action: SelectedImageActions
) {
  let imageIndexInSelectedImages: number;
  let newPosition: number | null;
  switch (action.type) {
    case SelectedImageType.TOGGLE_SELECTED:
      imageIndexInSelectedImages = state.selectedImages.findIndex(
        (a) => a === action.payload.id
      );
      if (imageIndexInSelectedImages > -1) {
        state.selectedImages = [
          ...state.selectedImages.slice(0, imageIndexInSelectedImages),
          ...state.selectedImages.slice(imageIndexInSelectedImages + 1),
        ];
        action.payload.updateItemPositionById(action.payload.id, null);
        state.selectedImages.forEach((selectedImage) => {
          const index = state.selectedImages.findIndex(
            (a) => a === selectedImage
          );
          newPosition = index + 1 + action.payload.startIndex;
          action.payload.updateItemPositionById(selectedImage, newPosition);
        });
      } else {
        state.selectedImages = [...state.selectedImages, action.payload.id];
        newPosition = state.selectedImages.length + action.payload.startIndex;
        action.payload.updateItemPositionById(action.payload.id, newPosition);
      }
      break;
    case SelectedImageType.ON_REMOVE_SELECTED_IMAGE:
      imageIndexInSelectedImages = state.selectedImages.findIndex(
        (a) => a === action.payload.id
      );
      if (imageIndexInSelectedImages > -1) {
        action.payload.updateItemPositionById(action.payload.id, null);
        state.selectedImages = [
          ...state.selectedImages.slice(0, imageIndexInSelectedImages),
          ...state.selectedImages.slice(imageIndexInSelectedImages + 1),
        ];
        state.selectedImages.forEach((selectedImage) => {
          const index = state.selectedImages.findIndex(
            (a) => a === selectedImage
          );
          newPosition = index + 1 + action.payload.startIndex;
          action.payload.updateItemPositionById(selectedImage, newPosition);
        });
      }
      break;
    case SelectedImageType.RECALCULATE_INDEX_SELECTED_IMAGE:
      state.selectedImages?.forEach((selectedImage) => {
        const index = state.selectedImages.findIndex(
          (a) => a === selectedImage
        );
        newPosition = index + 1 + action.payload.startIndex;
        action.payload.updateItemPositionById(selectedImage, newPosition);
      });
      break;
    case SelectedImageType.CREATE_BACKUP_SELECTED_IMAGES:
      state.savedSelectedImages = state.selectedImages;
      break;
    case SelectedImageType.RESTORE_SELECTED_IMAGES:
      state.selectedImages.forEach((selectedImage) => {
        action.payload.updateItemPositionById(selectedImage, null);
      });
      state.selectedImages = state.savedSelectedImages;
      state.selectedImages.forEach((selectedImage) => {
        const index = state.selectedImages.findIndex(
          (a) => a === selectedImage
        );
        newPosition = index + 1 + action.payload.startIndex;
        action.payload.updateItemPositionById(selectedImage, newPosition);
      });
      break;

    case SelectedImageType.CLEAR_SELECTED_IMAGES:
      state.selectedImages.forEach((selectedImage) => {
        action.payload.updateItemPositionById(selectedImage, null);
      });
      state.selectedImages = [];
      state.savedSelectedImages = [];
  }
}

interface useSelectedImageProps {
  updateItemPositionById: (id: string, position: number | null) => void;
  startIndex: number;
}

export function useSelectedImage({
  updateItemPositionById,
  startIndex,
}: useSelectedImageProps) {
  const [selectedImage, dispatch] = useImmerReducer<
    SelectedImageState,
    SelectedImageActions
  >(selectedImageReducer, {
    selectedImages: [],
    savedSelectedImages: [],
  });

  const handleToggleSelectedImage = useCallback(
    (id: string) => {
      dispatch({
        type: SelectedImageType.TOGGLE_SELECTED,
        payload: {
          id: id,
          updateItemPositionById: updateItemPositionById,
          startIndex: startIndex,
        },
      });
    },
    [dispatch, startIndex, updateItemPositionById]
  );

  const handleRecalculateIndexOfSelectedImages = useCallback(() => {
    dispatch({
      type: SelectedImageType.RECALCULATE_INDEX_SELECTED_IMAGE,
      payload: {
        updateItemPositionById: updateItemPositionById,
        startIndex: startIndex,
      },
    });
  }, [dispatch, startIndex, updateItemPositionById]);

  const handleRemoveSelectedImage = useCallback(
    (id: string) => {
      dispatch({
        type: SelectedImageType.ON_REMOVE_SELECTED_IMAGE,
        payload: {
          id: id,
          updateItemPositionById: updateItemPositionById,
          startIndex: startIndex,
        },
      });
    },
    [dispatch, startIndex, updateItemPositionById]
  );

  const handleRestoreSelectedImages = useCallback(() => {
    dispatch({
      type: SelectedImageType.RESTORE_SELECTED_IMAGES,
      payload: {
        updateItemPositionById: updateItemPositionById,
        startIndex: startIndex,
      },
    });
  }, [dispatch, startIndex, updateItemPositionById]);

  const handleCreateBackupSelectedImages = useCallback(() => {
    dispatch({ type: SelectedImageType.CREATE_BACKUP_SELECTED_IMAGES });
  }, [dispatch]);

  const handleClearSelectedImages = useCallback(() => {
    dispatch({
      type: SelectedImageType.CLEAR_SELECTED_IMAGES,
      payload: { updateItemPositionById: updateItemPositionById },
    });
  }, [dispatch, updateItemPositionById]);

  useEffect(() => {
    handleRecalculateIndexOfSelectedImages();
  }, [startIndex, handleRecalculateIndexOfSelectedImages]);

  return {
    handleRecalculateIndexOfSelectedImages,
    handleRestoreSelectedImages,
    handleToggleSelectedImage,
    handleRemoveSelectedImage,
    handleCreateBackupSelectedImages,
    handleClearSelectedImages,
    selectedImages: selectedImage.selectedImages,
  };
}
