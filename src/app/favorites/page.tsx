import { bubblegum } from "@/utils/fonts";
export default function Favorites() {
  return (
    <div className="  w-full max-w-[1500px] pt-30 pb-10 min-h-[100vh] bg-white ">
      <h2 className={` ${bubblegum.className} text-center text-5xl mb-15`}>
        Your Favorite Recipes
      </h2>
      <section className="flex flex-wrap justify-center m-auto gap-[1rem] max-w-[1000px] ">
        <div>Feature will be available soon</div>
      </section>
    </div>
  );
}
