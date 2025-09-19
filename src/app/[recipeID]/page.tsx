import { fetchInformation, fetchRandom } from "@/utils/index";
import RecipeCard from "@/_components/RecipeCard";

import { bubblegum, charm } from "@/utils/fonts";

export default async function RecipeDetails({
  params,
}: {
  params: Promise<{ recipeID: string }>;
}) {
  const id = (await params).recipeID;

  const information = await fetchInformation(id);
  const randomRecipes = await fetchRandom(4);
  function stripHTML(text: string) {
    return text.replace(/<[^>]*>?/gm, "");
  }
  return (
    <div className="w-full max-w-[1500px] bg-white pb-[5rem]">
      <section className="w-full h-screen max-h-[1000px] relative overflow-hidden mb-5">
        <img
          src={information.image}
          alt="background Image"
          className="absolute top-0 left-0 w-full h-full object-fill"
          loading="eager"
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-lg z-10"></div>

        <h1
          className={` ${charm.className} text-7xl text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white rounded-3xl p-5 z-20`}
        >
          {information.title}
        </h1>
      </section>
      <ul className="flex items-center justify-center w-full gap-5 mb-15 w-full ">
        {information.nutrition?.nutrients
          ?.filter((nut: any) =>
            ["Calories", "Fat", "Protein"].includes(nut.name)
          )
          .map((nutrient: any, i: any) => (
            <li
              key={i}
              className=" border border-containerHover py-2 px-4 rounded-lg text-center select-none text-base"
            >
              <span className="font-bold">{nutrient.name}</span>
              <span className="block">
                {nutrient.amount} {nutrient.unit}
              </span>
            </li>
          ))}
      </ul>
      <section className="  w-full flex  flex-between justify-between gap-5 p-5 max-lg:flex-col">
        <div className="lg:pl-5 flex-1 flex flex-col justify-center gap-y-[3rem] self-start max-lg:items-start max-lg:flex-row max-lg:gap-x-5 max-sm:flex-col max-sm:items-center">
          <div className="flex-1 w-full">
            <h3 className={`${bubblegum.className} text-3xl`}>Ingredients</h3>
            <ul className="flex flex-col gap-y-4 mt-4">
              {information.extendedIngredients.map(
                (ingredient: any, i: number) => (
                  <li key={i} className="ingredient-list relative pl-[15px]">
                    {ingredient.original}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex-2 max-sm:text-center lg:pr-10">
            <h3 className={`${bubblegum.className} text-3xl`}>Summary</h3>
            <p className="leading-7">{stripHTML(information.summary)}</p>
          </div>
        </div>
        <div className="flex-1 ">
          <h3
            className={` ${bubblegum.className} mb-[1rem] max-lg:text-center text-3xl`}
          >
            Discover
          </h3>
          <div className=" w-full max-w-[1200px] flex flex-wrap justify-center gap-[1rem]">
            {randomRecipes.map((item: any) => (
              <RecipeCard
                id={item.id}
                title={item.title}
                image={item.image}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
