export type SelectedImageState = {
  selectedImages: string[];
  savedSelectedImages: string[];
};

export enum SelectedImageType {
  RESTORE_SELECTED_IMAGES = 'RESTORE_SELECTED_IMAGES',
  ON_REMOVE_SELECTED_IMAGE = 'ON_REMOVE_SELECTED_IMAGE',
  TOGGLE_SELECTED = 'TOGGLE_SELECTED',
  RECALCULATE_INDEX_SELECTED_IMAGE = 'RECALCULATE_INDEX_SELECTED_IMAGE',
  CREATE_BACKUP_SELECTED_IMAGES = 'CREATE_BACKUP_SELECTED_IMAGES',
  CLEAR_SELECTED_IMAGES = 'CLEAR_SELECTED_IMAGES',
}

export type SelectedImageActions =
  | {
      type: SelectedImageType.RESTORE_SELECTED_IMAGES;
      payload: {
        updateItemPositionById: (id: string, position: number | null) => void;
        startIndex: number;
      };
    }
  | {
      type: SelectedImageType.ON_REMOVE_SELECTED_IMAGE;
      payload: {
        id: string;
        updateItemPositionById: (id: string, position: number | null) => void;
        startIndex: number;
      };
    }
  | {
      type: SelectedImageType.RECALCULATE_INDEX_SELECTED_IMAGE;
      payload: {
        updateItemPositionById: (id: string, position: number | null) => void;
        startIndex: number;
      };
    }
  | {
      type: SelectedImageType.TOGGLE_SELECTED;
      payload: {
        id: string;
        updateItemPositionById: (id: string, position: number | null) => void;
        startIndex: number;
      };
    }
  | { type: SelectedImageType.CREATE_BACKUP_SELECTED_IMAGES }
  | {
      type: SelectedImageType.CLEAR_SELECTED_IMAGES;
      payload: {
        updateItemPositionById: (id: string, position: number | null) => void;
      };
    };
