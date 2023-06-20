import { SelectedImage } from '../../types';

export interface CameraRollPhotosState {
  ids: string[];
  entities: { [key: string]: SelectedImage };
  nextCursor: string | undefined;
  hasNextPage: boolean;
}

export enum CameraRollPhotosType {
  FULFILED = 'FULFILED',
  ON_LIST_LOADED = 'ON_LIST_LOADED',
  UPDATE_ITEM_SELECTED_POSITION = 'UPDATE_ITEM_SELECTED_POSITION',
  FULFILED_IOS_LIBRARY_SELECTION_CHANGED = 'FULFILED_IOS_LIBRARY_SELECTION_CHANGED',
}

export type CameraRollPhotosActions =
  | {
      type: CameraRollPhotosType.FULFILED;
      payload: {
        result: string[];
        entities: { images: { [key: string]: SelectedImage } };
      };
    }
  | {
      type: CameraRollPhotosType.ON_LIST_LOADED;
      payload: { hasNextPage: boolean; nextCursor: string | undefined };
    }
  | {
      type: CameraRollPhotosType.UPDATE_ITEM_SELECTED_POSITION;
      payload: { id: string; position: number | null };
    }
  | {
      type: CameraRollPhotosType.FULFILED_IOS_LIBRARY_SELECTION_CHANGED;
      payload: {
        result: string[];
        entities: { images: { [key: string]: SelectedImage } };
      };
    };

export const initialCameraRollState = {
  ids: [],
  entities: {},
  nextCursor: undefined,
  hasNextPage: false,
};
