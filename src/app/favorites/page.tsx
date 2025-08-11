import { bubblegum } from "@/utils/fonts";
export default function Favorites() {
  return (
    <div className=" flex flex-col justify-between gap-6 w-full max-w-[1500px] mt-30 mb-10 ">
      <h2 className={` ${bubblegum.className} text-center text-5xl`}>
        Your Favorite Recipes
      </h2>
      <section className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[1rem] max-w-[1000px] m-auto ">
        <div className="w-[200px] h-[200px] bg-red-400"></div>
        <div className="w-[200px] h-[200px] bg-red-400"></div>
        <div className="w-[200px] h-[200px] bg-red-400"></div>
        <div className="w-[200px] h-[200px] bg-red-400"></div>
        <div className="w-[200px] h-[200px] bg-red-400"></div>
        <div className="w-[200px] h-[200px] bg-red-400"></div>
        <div className="w-[200px] h-[200px] bg-red-400"></div>
      </section>
    </div>
  );
}
