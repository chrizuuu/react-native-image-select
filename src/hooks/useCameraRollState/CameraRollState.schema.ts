import { schema, normalize } from "normalizr";
import { SelectedImage } from "../../types";

export type ImagePickerNormalizationResult = {
  images: { [key: string]: SelectedImage };
};

export const ImagePickerSchemaEntity = new schema.Entity<SelectedImage>(
  "images",
  undefined,
  {
    idAttribute: "uri",
  }
);

export const normalizeImagePicker = (list: SelectedImage[]) =>
  normalize<SelectedImage, ImagePickerNormalizationResult, string[]>(list, [
    ImagePickerSchemaEntity,
  ]);
