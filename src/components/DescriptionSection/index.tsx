"use client";
import { useFormikContext } from "formik";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const DescriptionSection: React.FC = () => {
  let { handleBlur, handleChange } = useFormikContext<Recipe>();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default DescriptionSection;
