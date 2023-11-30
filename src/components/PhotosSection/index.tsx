"use client";
import { FieldArray, useFormikContext } from "formik";
import { X } from "lucide-react";
import ImageFileInput from "../FileInput";
import { Label } from "../ui/label";

const PhotosSection: React.FC = () => {
  let { values } = useFormikContext<Recipe>();

  return (
    <>
      <Label htmlFor="photos-input">Photos</Label>
      <FieldArray
        name="photos"
        render={(arrHelpers) => (
          <div className="flex flex-col gap-2">
            <div className="grid grid-flow-row grid-cols-3 gap-2">
              {values.photos &&
                values.photos.length > 0 &&
                values.photos.map((photo, pI) => (
                  <div key={`photo-${photo.name}-${pI}`}>
                    <button
                      onClick={() => {
                        arrHelpers.remove(pI);
                      }}
                      className="relative group h-max"
                    >
                      <div className="absolute w-full h-full bg-black/30 hidden group-hover:flex items-center justify-center">
                        <X color="red" />
                      </div>
                      <img
                        src={URL.createObjectURL(photo)}
                        className="w-[200px]"
                      />
                    </button>
                  </div>
                ))}
            </div>
            <ImageFileInput />
          </div>
        )}
      />
    </>
  );
};

export default PhotosSection;
