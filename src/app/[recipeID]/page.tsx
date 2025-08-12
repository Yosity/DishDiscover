import { fetchInformation, fetchRandom } from "@/utils/index";
import RecipeCard from "@/components/RecipeCard";

import { bubblegum, charm } from "@/utils/fonts";

export default async function RecipeDetails({
  params,
}: {
  params: { recipeID: string };
}) {
  const id = (await params).recipeID;

  const information = await fetchInformation(id);
  const randomRecipes = await fetchRandom(3);

  function stripHTML(text) {
    return text.replace(/<[^>]*>?/gm, "");
  }
  return (
    <div className="w-full max-w-[1500px] bg-white">
      <section className="w-full h-screen max-h-[1000px] relative overflow-hidden">
        {/* Background Image */}
        <img
          src={information.image}
          alt="background Image"
          className="absolute top-0 left-0 w-full h-full object-fill"
          loading="lazy"
        />

        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-lg z-10"></div>

        {/* Title */}
        <h1
          className={` ${charm.className} text-7xl text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white rounded-3xl p-5 z-20`}
        >
          {information.title}
        </h1>
      </section>
      <section className="  w-full flex  flex-between justify-between gap-5 p-5 max-lg:flex-col">
        <div className="lg:pl-5 flex-1 flex flex-col justify-center gap-y-[3rem] self-start max-lg:items-start max-lg:flex-row max-lg:gap-x-5 max-sm:flex-col max-sm:items-center">
          <div className="flex-1 w-full">
            <h3 className={`${bubblegum.className} text-3xl`}>Ingredients</h3>
            <ul className="flex flex-col gap-y-4 mt-4">
              {information.extendedIngredients.map((ingredient, i) => (
                <li key={i} className="ingredient-list relative pl-[15px]">
                  {ingredient.original}
                </li>
              ))}
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
            {randomRecipes.map((item) => (
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
