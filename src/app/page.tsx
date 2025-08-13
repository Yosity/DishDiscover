"use client";
import { useEffect, useState } from "react";
import { fetchRecipes, fetchRandom } from "@/utils/index";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";

import { charm } from "@/utils/fonts";
import { bubblegum } from "@/utils/fonts";

type Recipe = {
  id: number;
  title: string;
  image: string;
};
export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(async () => {
      const results = await fetchRecipes(query);
      setRecipes(results);
      setLoading(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleFetchMore = async () => {
    setLoadingRandom(true);
    const moreResults = await fetchRecipes(query, offset + 8, 8);
    setRecipes((prev) => [...prev, ...moreResults]);
    setOffset((prev) => prev + 8);
    setLoadingRandom(false);
  };

  return (
    <div className="bg-white w-full max-w-[1500px] pb-[5rem]">
      <section className="w-full h-screen max-h-[1000px] relative overflow-hidden mb-15">
        <picture>
          <source media="(max-width: 858px)" srcSet="/hero-mobile.webp" />
          <img
            src="/hero-desktop.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-fill"
            loading="eager"
          />
        </picture>

        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/20  z-10"></div>

        <span
          className={` ${charm.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                 text-white text-center bg-black/20 backdrop-blur-sm text-8xl p-8 rounded-lg z-20`}
        >
          BON APPETITE
        </span>
      </section>
      <section className=" mb-15 p-5 flex flex-col items-center justify-center gap-10 text-center lg:flex-row-reverse lg:items-start lg:text-start">
        <div className="flex-1 lg:pl-5">
          <h2 className={`text-7xl ${bubblegum.className}`}>WELCOME !!</h2>
          <p className="leading-7 tracking-wide">
            to DishDiscover, your gateway to exploring delicious meals from
            around the world! Whether you’re craving comfort food, hunting for a
            quick weeknight dinner, or trying something entirely new, we’ve got
            you covered. All recipes and meal information on our site are
            sourced from the <b>Spoonacular API</b>, a rich and reliable
            database of culinary inspiration. <b>Please note </b> that we’re
            currently using the free version of the API, which limits us to 50
            requests per day....{" "}
            <span className="uppercase text-xs font-[600]">
              So dont explore too much eh ?
            </span>
          </p>
          <p className="mt-5">You can search for whatever recipe down below</p>
        </div>
        <div className=" flex-1 ">
          <img
            src="/pizzaMan.webp"
            alt="Pizza Man"
            className="w-full max-w-[550px] m-auto min-w-[280px]  aspect-square"
          />
        </div>
      </section>
      <section className="w-full px-5 py-[2rem] flex flex-col justify-center items-center gap-y-[3rem]">
        <input
          className="w-full max-w-xl px-4 py-3 rounded-lg border border-gray-500"
          placeholder="Search"
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        <div className=" max-w-[1200px] w-full grid grid-cols-4 max-lg:grid-cols-3 max-lg:justify-center max-sm:flex max-sm:flex-wrap gap-[1rem]">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <RecipeCardSkeleton key={`skeleton-${i}`} />
              ))
            : recipes.map((item: any) => (
                <RecipeCard
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  key={item.id}
                />
              ))}

          {loadingRandom &&
            Array.from({ length: 4 }).map((_, i) => (
              <RecipeCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>
        <button
          onClick={handleFetchMore}
          disabled={loadingRandom}
          className="mt-8 px-6 py-3 bg-header text-white font-bold rounded-lg disabled:bg-gray-400 duration-150 cursor-pointer"
        >
          {loadingRandom ? "Loading..." : "Show more"}
        </button>
      </section>
    </div>
  );
}
