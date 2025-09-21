"use client";

import { supabase } from "@/utils/supabaseClient";
import { ChangeEvent, useState } from "react";

export default function NewRecipeForm({ isAllowed }: { isAllowed: boolean }) {
  const [newRecipe, setnewRecipe] = useState({
    title: "",
    ingredients: [""],
    nutrients: { protein: "", fats: "", calories: "" },
    summary: "",
  });

  const [recipeImg, setRecipeImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitLoad, setSubmitLoad] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitLoad(true);
    if (!isAllowed) {
      window.alert("You are not authorized to add a recipe, Sign in first");
      setSubmitLoad(false);
      return;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    let imageUrl: string | null = null;
    if (recipeImg) {
      imageUrl = await uploadImage(recipeImg);
    }
    const { error } = await supabase
      .from("recipes")
      .insert({ ...newRecipe, created_by: userId, image_url: imageUrl })
      .single();

    if (error) {
      window.alert("Error inserting the data");
      setSubmitLoad(false);
      return;
    } else {
      setnewRecipe({
        title: "",
        ingredients: [""],
        nutrients: { protein: "", fats: "", calories: "" },
        summary: "",
      });
    }
    setSubmitLoad(false);
  };

  // const handleDelete = async (id: number) => {
  //   const { error } = await supabase.from("recipes").delete().eq("id", id);

  //   if (error) {
  //     window.alert("Error deleting the data");
  //     return;
  //   }
  // };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("recipe_images")
      .upload(filePath, file);
    if (error) {
      window.alert("Error Uploading Image");
      return null;
    }

    const { data } = supabase.storage
      .from("recipe_images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRecipeImg(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    }
  };
  return (
    <div className=" flex-1 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[600px] bg-text p-8 rounded-xl flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Add New Recipes
        </h2>
        <input
          type="text"
          placeholder="Recipe Name"
          className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
          value={newRecipe.title}
          onChange={(e) =>
            setnewRecipe({ ...newRecipe, title: e.target.value })
          }
          required
        />

        <div className="flex flex-col gap-2">
          <div className="max-h-[150px] overflow-auto flex flex-col gap-3 justify-start">
            {newRecipe.ingredients.map((ing, idx) => (
              <div key={idx} className=" gap-2">
                <input
                  type="text"
                  placeholder={`Ingredient (e.g: 1 cup of milk)`}
                  className="flex-1 w-60 rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
                  value={ing}
                  required
                  onChange={(e) => {
                    const updated = [...newRecipe.ingredients];
                    updated[idx] = e.target.value;
                    setnewRecipe({ ...newRecipe, ingredients: updated });
                  }}
                />
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = newRecipe.ingredients.filter(
                        (_, i) => i !== idx
                      );
                      setnewRecipe({ ...newRecipe, ingredients: updated });
                    }}
                    className="px-2 py-1 ml-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setnewRecipe({
                ...newRecipe,
                ingredients: [...newRecipe.ingredients, ""],
              })
            }
            className="mt-2 w-fit cursor-pointer bg-header text-white px-3 py-2 rounded-md hover:bg-transparent border border-header transition"
          >
            + Add Ingredient
          </button>
        </div>

        <ul className="flex flex-wrap justify-start gap-4">
          <li className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Protein (g)"
              className="flex-1 rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
              value={newRecipe.nutrients.protein}
              onChange={(e) =>
                setnewRecipe({
                  ...newRecipe,
                  nutrients: {
                    ...newRecipe.nutrients,
                    protein: e.target.value,
                  },
                })
              }
            />
          </li>

          <li className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Fats (g)"
              className="flex-1 rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
              value={newRecipe.nutrients.fats}
              onChange={(e) =>
                setnewRecipe({
                  ...newRecipe,
                  nutrients: { ...newRecipe.nutrients, fats: e.target.value },
                })
              }
            />
          </li>

          <li className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Calories (kcal)"
              className="flex-1 rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
              value={newRecipe.nutrients.calories}
              onChange={(e) =>
                setnewRecipe({
                  ...newRecipe,
                  nutrients: {
                    ...newRecipe.nutrients,
                    calories: e.target.value,
                  },
                })
              }
            />
          </li>
        </ul>

        <textarea
          placeholder="Summary"
          className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
          value={newRecipe.summary}
          onChange={(e) =>
            setnewRecipe({ ...newRecipe, summary: e.target.value })
          }
          required
        />
        {previewUrl && (
          <div className="flex justify-center">
            <img
              src={previewUrl}
              alt="Recipe Preview"
              className="w-30 h-20 object-fill rounded-md mb-2 border border-gray-300"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-white w-fit p-2 cursor-pointer"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className={`  ${
              submitLoad
                ? "bg-white text-header hover:bg-white"
                : "bg-header text-white"
            } cursor-pointer bg-header text-white px-4 py-2 rounded-md hover:bg-transparent border border-header transition`}
          >
            {submitLoad ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
