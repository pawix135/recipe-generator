"use client";
import { Formik, FormikHelpers, Form } from "formik";
import { jsPDF } from "jspdf";
import PhotosSection from "@/components/PhotosSection";
import RecipeNameSection from "@/components/RecipeNameSection";
import IngredientsSection from "@/components/IngredientsSection";
import DescriptionSection from "@/components/DescriptionSection";
import SubmitSection from "@/components/SubmitSection";

export default function Home() {
  /** TODO
   * Wysiwyg description
   * Image dimensions
   * Creating sections
   * Checking if description need another page
   */

  const createRecipe = async (values: Recipe, _: FormikHelpers<Recipe>) => {
    let pdf = new jsPDF();

    // Add text to PDF with option to set font weight and size
    const addText = (
      text: string,
      position: { x: number; y: number },
      type: "bold" | "normal",
      fontSize?: number
    ) => {
      pdf.setFont("helvetica", "normal", type);
      pdf.setFontSize(fontSize ? fontSize : type == "bold" ? 20 : 16);
      pdf.text(pdf.splitTextToSize(text, 190), position.x, position.y);
    };

    addText(`Recipe: ${values.name}`, { x: 10, y: 20 }, "bold", 23);
    addText("Ingredients:", { x: 10, y: 40 }, "bold");

    // Awaiting Promise.all to make sure everyting is added to PDF correctly
    await Promise.all(
      values.ingredients.map((item, index) => {
        let formatText = `\u2022 ${item.name} - ${item.quantity} ${
          item.type == "null" ? "" : `${item.type}`
        } ${item.note ? `- Note: ${item.note}` : ""}`;
        addText(formatText, { x: 10, y: 40 + (index + 1) * 10 }, "normal");
      })
    );

    // Add page for Preparation/description
    // TODO: Check for length of values.description and add another page if needed
    pdf.addPage();
    pdf.setPage(2);

    addText("Preparation:", { x: 10, y: 20 }, "bold", 23);
    addText(values.description, { x: 10, y: 30 }, "normal", 12);

    // Add page for photos
    // TODO: Photo dimensions and scaling
    pdf.addPage();
    pdf.setPage(3);

    // Dimensions of pdf page
    let height = pdf.internal.pageSize.getHeight() - 50;
    let width = pdf.internal.pageSize.getWidth() - 10;

    let imgWSize = width - 10;
    let imgHSize =
      values.photos.length == 1 ? height / 3 : height / values.photos.length;

    // Awaiting promise to add photos to pdf
    await Promise.all(
      values.photos.map(async (item, i) => {
        let buffer = new Uint8Array(await item.arrayBuffer());
        let y = i == 0 ? 5 : i * imgHSize;

        pdf.addImage(
          buffer,
          item.type.split("/")[1],
          10,
          y,
          imgWSize,
          imgHSize
        );
      })
    );

    pdf.save(values.name ?? "Recipe");
  };

  return (
    <main className="container">
      <Formik
        initialValues={
          {
            name: "",
            ingredients: [],
            photos: [],
            description: "",
          } as Recipe
        }
        onSubmit={createRecipe}
      >
        <Form className="flex flex-col gap-3 flex-1 p-2 max-w-[600px] mx-auto">
          <RecipeNameSection />
          <IngredientsSection />
          <DescriptionSection />
          <PhotosSection />
          <SubmitSection />
        </Form>
      </Formik>
    </main>
  );
}
