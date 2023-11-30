type Ingredient = {
  name: string;
  quantity: number;
  type: IngredientQuantityType;
  note?: string;
};

interface Recipe {
  name: string;
  description: string;
  ingredients: Ingredient[];
  photos: File[];
}

type IngredientQuantityType =
  | "L"
  | "ml"
  | "g"
  | "Kg"
  | "dkg"
  | "null"
  | "slices";
