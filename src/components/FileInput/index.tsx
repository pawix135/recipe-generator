"use client";
import { useFormikContext } from "formik";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

const ImageFileInput: React.FC = () => {
  let { values, setFieldValue, handleBlur, handleReset } =
    useFormikContext<Recipe>();

  return (
    <Input
      type="file"
      accept="image/*"
      name={`photos-input`}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        if (
          !event.currentTarget.files ||
          !event.currentTarget.files![0].type.includes("image")
        ) {
          return;
        }
        if (!values.photos || values.photos.length < 1) {
          setFieldValue("photos", [event.currentTarget.files![0]]);
        } else {
          setFieldValue("photos", [
            ...values.photos,
            event.currentTarget.files![0],
          ]);
        }
      }}
      onBlur={handleBlur}
      onReset={handleReset}
    />
  );
};

export default ImageFileInput;
