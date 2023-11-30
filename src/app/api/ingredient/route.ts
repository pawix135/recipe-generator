import ingredients from "@/ingredients.json";
export const revalidate = 0;

function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function unCapitalizeFirstLetter(name: string) {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export const GET = async (request: Request) => {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  console.log(name);

  if (!name) {
    return Response.json({
      ok: true,
      ingredients: ingredients.meals.slice(0, 30).map((item) => ({
        value: item.strIngredient.toLocaleLowerCase(),
        label: capitalizeFirstLetter(item.strIngredient),
      })),
    });
  }

  let found = ingredients.meals.filter((item) =>
    unCapitalizeFirstLetter(item.strIngredient).includes(
      unCapitalizeFirstLetter(name!)
    )
  );

  console.log(found);

  return Response.json({
    ok: true,
    ingredients: found.map((item) => ({
      value: item.strIngredient.toLocaleLowerCase(),
      label: capitalizeFirstLetter(item.strIngredient),
    })),
  });
};
