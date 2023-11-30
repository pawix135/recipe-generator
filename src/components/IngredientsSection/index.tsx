"use client";
import { FieldArray, useFormikContext } from "formik";
import { useRef } from "react";
import { Label } from "../ui/label";
import { Grip, X } from "lucide-react";
import CustomInput from "../CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const IngredientTypes: IngredientQuantityType[] = [
  "null",
  "L",
  "ml",
  "g",
  "Kg",
  "dkg",
  "slices",
] as const;

const IngredientsSection: React.FC = () => {
  let { values, handleBlur, handleChange, setFieldValue } =
    useFormikContext<Recipe>();

  const dropOverIndex = useRef<number | null>(null);

  return (
    <FieldArray
      name="ingredients"
      render={(arrHelpers) => {
        return (
          <div
            className="flex flex-col gap-2"
            onDrop={(e) => {
              e.preventDefault();
              let index = parseInt(e.dataTransfer.getData("text/plain"));
              if (dropOverIndex.current != null) {
                arrHelpers.swap(index, dropOverIndex.current);
              }
              dropOverIndex.current = null;
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <Label htmlFor="#">Ingredients</Label>
            {values.ingredients &&
              values.ingredients.length > 0 &&
              values.ingredients.map((ingredient, i) => {
                return (
                  <div
                    key={`igredient-${i}`}
                    className="flex items-center flex-row gap-3 py-2"
                    draggable="true"
                    onDragOver={(e) => {
                      dropOverIndex.current = i;
                    }}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", i.toString());
                    }}
                  >
                    <Grip color="black" />
                    <CustomInput
                      type="text"
                      name={`ingredients.${i}.name`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Name"
                    />
                    <CustomInput
                      type="number"
                      name={`ingredients.${i}.quantity`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={0}
                      max={1000}
                      className="w-max max-w-[50px] md:max-w-[100px]"
                    />
                    <Select
                      name={`ingredients.${i}.type`}
                      onValueChange={(e) => {
                        setFieldValue(`ingredients.${i}.type`, e);
                      }}
                    >
                      <SelectTrigger className="w-[50px] md:w-[180px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {IngredientTypes.map((item, i) => {
                          return (
                            <SelectItem
                              value={item}
                              key={`type-${i}`}
                              className={cn({
                                "py-3": item == "null",
                              })}
                            >
                              {item == "null" ? "" : item}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <CustomInput
                      type="text"
                      name={`ingredients.${i}.note`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Note"
                    />

                    <button
                      onClick={() => {
                        arrHelpers.remove(i);
                      }}
                      type="button"
                    >
                      <X color="red" />
                    </button>
                  </div>
                );
              })}
            <div>
              <Button
                onClick={() => {
                  arrHelpers.push<Ingredient>({
                    name: "",
                    quantity: 1,
                    note: "",
                    type: "null",
                  });
                }}
                type="button"
              >
                Add ingredient
              </Button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default IngredientsSection;
