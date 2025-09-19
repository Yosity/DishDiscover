"use client";

import { supabase } from "@/utils/supabaseClient";
import { use, useEffect, useState } from "react";

export default function NewRecipeForm({ isAllowed }: { isAllowed: boolean }) {
  const [newRecipe, setnewRecipe] = useState({
    title: "",
    ingredients: [""],
    nutrients: { protein: "", fats: "", calories: "" },
    summary: "",
  });
  const [recipes, setRecipes] = useState<any>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isAllowed) {
      window.alert("You are not authorized to add a recipe, Sign in first");
      return;
    }
    const { error } = await supabase.from("recipes").insert(newRecipe).single();

    if (error) {
      window.alert("Error inserting the data");
      return;
    } else {
      setnewRecipe({
        title: "",
        ingredients: [""],
        nutrients: { protein: "", fats: "", calories: "" },
        summary: "",
      });
    }
  };
  // const handleDelete = async (id: number) => {
  //   const { error } = await supabase.from("recipes").delete().eq("id", id);

  //   if (error) {
  //     window.alert("Error deleting the data");
  //     return;
  //   }
  // };

  console.log(recipes);
  return (
    <div className=" flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[600px] bg-text p-8 rounded-xl flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Add New Recipe
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
          {newRecipe.ingredients.map((ing, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Ingredient ${idx + 1} (e.g: 1 cup of milk)`}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
              value={ing}
              onChange={(e) => {
                const updated = [...newRecipe.ingredients];
                updated[idx] = e.target.value;
                setnewRecipe({ ...newRecipe, ingredients: updated });
              }}
            />
          ))}

          <button
            type="button"
            onClick={() =>
              setnewRecipe({
                ...newRecipe,
                ingredients: [...newRecipe.ingredients, ""],
              })
            }
            className="mt-2 w-fit cursor-pointer bg-containerHover text-white px-3 py-2 rounded-md hover:bg-transparent border border-containerHover transition"
          >
            + Add Ingredient
          </button>
        </div>
        <div className="flex gap-3 flex-wrap">
          {["protein", "fats", "calories"].map((nutrient) => (
            <input
              key={nutrient}
              type="number"
              placeholder={nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
              className="rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
              value={
                newRecipe.nutrients[
                  nutrient as keyof typeof newRecipe.nutrients
                ]
              }
              onChange={(e) =>
                setnewRecipe({
                  ...newRecipe,
                  nutrients: {
                    ...newRecipe.nutrients,
                    [nutrient]: e.target.value,
                  },
                })
              }
            />
          ))}
        </div>
        <textarea
          placeholder="Summary"
          className="block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
          value={newRecipe.summary}
          onChange={(e) =>
            setnewRecipe({ ...newRecipe, summary: e.target.value })
          }
          required
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-containerHover text-white px-4 py-2 rounded-md hover:bg-transparent border border-containerHover transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
