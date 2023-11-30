"use client";
import { useFormikContext } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CustomInput from "../CustomInput";

const RecipeNameSection: React.FC = () => {
  let { handleBlur, handleChange, handleReset } = useFormikContext<Recipe>();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name">Recipe name</Label>
      <CustomInput
        name="name"
        id="name"
        placeholder="Crumbuled Eggs"
        onChange={handleChange}
        onBlur={handleBlur}
        onReset={handleReset}
      />
    </div>
  );
};

export default RecipeNameSection;
