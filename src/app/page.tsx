"use client";
import { useEffect, useState } from "react";
import { fetchRecipes, fetchRandom } from "@/utils/index";
import RecipeCard from "@/_components/RecipeCard";
import RecipeCardSkeleton from "@/_components/RecipeCardSkeleton";
import NewRecipeForm from "@/_components/RecipeForm";
import { charm } from "@/utils/fonts";
import { bubblegum } from "@/utils/fonts";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import { supabase } from "@/utils/supabaseClient";
gsap.registerPlugin(ScrollTrigger);

type Recipe = {
  id: number;
  title: string;
  image: string;
};

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [supaRecipes, setSupaRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchSession();

    const handler = setTimeout(async () => {
      const results = await fetchRecipes(query);
      setRecipes(results);
      setLoading(false);
    }, 500);

    const { data: sessionListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      sessionListener.subscription.unsubscribe();
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSupabaseRecipes(session.user.id);
    }
  }, [session]);

  const fetchSession = async () => {
    const currenSession = await supabase.auth.getSession();
    setSession(currenSession.data.session);
  };

  const fetchSupabaseRecipes = async (userId: string) => {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("created_by", userId)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching supabase recipes:", error.message);
      return;
    }
    setSupaRecipes(data || []);
  };

  const handleFetchMore = async () => {
    setLoadingRandom(true);
    const moreResults = await fetchRecipes(query, offset + 8, 8);
    setRecipes((prev) => [...prev, ...moreResults]);
    setOffset((prev) => prev + 8);
    setLoadingRandom(false);
  };

  return (
    <div
      className="bg-white w-full max-w-[1500px] pb-[5rem]"
      id="main-container"
      data-scroll-container
    >
      <section className="w-full h-screen max-h-[1000px] relative overflow-hidden mb-15 lg:mb-0">
        <picture>
          <source media="(max-width: 858px)" srcSet="/hero-mobile.webp" />
          <img
            src="/hero-desktop.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-fill"
            loading="eager"
          />
        </picture>

        <div className="absolute inset-0 bg-black/20 z-10"></div>

        <span
          className={` ${charm.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                 text-white text-center bg-black/20 backdrop-blur-sm text-8xl p-8 rounded-lg z-20`}
        >
          BON APPETITE
        </span>
      </section>

      <section className="mb-15 lg:mb-0 lg:p-0 p-5 flex flex-col items-center justify-center gap-15 text-center lg:grid lg:grid-cols-2 lg:gap-0 lg:place-items-center lg:text-start">
        <div className="flex-1 p-10 lg:pt-25 h-full max-w-[750px] lg:order-2  ">
          <h2 className={`text-6xl mb-5 ${bubblegum.className}`}>WELCOME !!</h2>
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
          <p className="mt-5 mb-10">
            You can search for whatever recipe down below
          </p>
          <Link
            href={`/#recipes`}
            className=" p-3 rounded-md bg-header border border-transparent text-white hover:bg-white hover:text-black hover:border-black duration-150 self-center"
          >
            Take me there
          </Link>
        </div>
        <div className="w-full flex-1 overflow-hidden">
          <img
            src="/pizzaMan.webp"
            alt="Pizza Man"
            className="w-full max-w-[550px] lg:max-w-[650px]  m-auto min-w-[280px] aspect-square lg:translate-x-[-30px] lg:translate-y-[20px]"
          />
        </div>
      </section>

      <section className="mb-15 lg:mb-0  lg:p-0 flex flex-col items-center justify-center gap-10 text-center lg:grid lg:grid-cols-2 lg:gap-0 lg:place-items-center lg:text-start">
        <div className="flex-1 p-10 lg:pt-25  h-full max-w-[750px]">
          <h2 className={`text-6xl mb-5 ${bubblegum.className} relative`}>
            Cook Smarter, Eat Better
          </h2>
          <p className="leading-7 tracking-wide">
            Cooking at home doesn’t have to be stressful or complicated. Each
            recipe here comes with step-by-step instructions, cooking times, and
            nutrition facts, so you can plan your meals with confidence. Whether
            you’re new to the kitchen or already know your way around a cutting
            board, our goal is to make cooking something you actually look
            forward to. Think of DishDiscover as your friendly kitchen sidekick,
            helping you cook smarter, waste less, and eat meals you’ll actually
            be excited about.
          </p>
        </div>
        <div className="flex-1 overflow-hidden w-full ">
          <img
            src="/steak.webp"
            alt="Steak"
            className="w-full max-w-[550px] lg:max-w-none  m-auto min-w-[280px] aspect-square"
          />
        </div>
      </section>
      <section className="mb-15  flex flex-col items-center justify-center gap-10 lg:gap-0 text-center lg:grid lg:grid-cols-2 lg:place-items-center lg:text-start">
        <div className="flex-1 p-10 lg:pt-25  h-full max-w-[750px lg:order-2">
          <h2 className={`text-6xl mb-5 ${bubblegum.className}`}>
            Your Next Favorite Meal Awaits
          </h2>
          <p className="leading-7 tracking-wide">
            The beauty of cooking is that there’s always something new to try.
            Today it could be a quick 15-minute pasta, tomorrow a slow-cooked
            stew that fills the whole house with amazing smells. DishDiscover is
            here to give you those options—all you have to do is search and
            explore. And hey, don’t worry if you’re not a “pro chef.” Every
            recipe is written so anyone can follow along (yes, even if you’ve
            burned toast before 🥲). So… what are you waiting for? Type in an
            ingredient, a craving, or even just “chicken,” and let’s see what
            delicious ideas we can cook up together.
          </p>
        </div>
        <div className="flex-1  min-w-[280px] w-full ">
          <img
            src="/sully.webp"
            alt="Sully"
            className="w-full max-w-[550px] lg:max-w-none  m-auto min-w-[280px] aspect-square object-cover"
          />
        </div>
      </section>
      <section className=" flex max-lg:flex-col max-lg:items-center justify-start  items-end px-4 py-8   gap-2 max-lg:gap-15 mb-10 bg-orange-500/20">
        <NewRecipeForm isAllowed={!!session} />

        <div className="flex flex-col items-center justify-start gap-4 self-start flex-1">
          <h3 className={`text-2xl font-semibold ${bubblegum.className}`}>
            Your Recipes (Recent Four)
          </h3>
          {supaRecipes.length === 0 ? (
            <p className="text-black">You haven’t added any recipes yet.</p>
          ) : (
            <div className="  flex flex-wrap justify-center items-start gap-7 max-h-[600px] overflow-auto">
              {supaRecipes.map((recipe: any) => (
                <RecipeCard
                  id={`supabase-${recipe.id}`}
                  title={recipe.title}
                  image={"/fallback.webp"} // if no image column
                  key={recipe.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <section
        id="recipes"
        className="w-full px-5 py-[2rem] flex flex-col justify-center items-center gap-y-[3rem]"
      >
        <input
          className="w-full max-w-xl px-4 py-3 rounded-lg border border-gray-500"
          placeholder="Search"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="max-w-[1200px] w-full grid grid-cols-4 max-lg:grid-cols-3 max-lg:justify-center max-sm:flex max-sm:flex-wrap gap-[1rem]">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <RecipeCardSkeleton key={`skeleton-${i}`} />
              ))
            : recipes.map((item: any) => (
                <RecipeCard
                  id={`spoonacular-${item.id}`}
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
          className="mt-8 px-6 py-3 bg-header border border-header hover:bg-transparent hover:text-text text-white font-bold rounded-lg disabled:bg-gray-400 duration-150 cursor-pointer"
        >
          {loadingRandom ? "Loading..." : "Show more"}
        </button>
      </section>
    </div>
  );
}
