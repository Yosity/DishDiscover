"use client";
import Link from "next/link";
export default function RecipeCard({ id, title, image }) {
  return (
    <Link
      href={`/${id}`}
      key={id}
      className=" group justify-self-center align-self-start border border-red-600 overflow-hidden pb-3 rounded-lg max-w-[400px] bg-container flex flex-col justify-start items-center text-center gap-y-[20px] hover:bg-containerHover duration-300"
    >
      <div className=" overflow-hidden h-[180px] md:h-[200px] w-full min-w-[280px]">
        <img
          src={image}
          alt="Meal Image"
          onError={(e) => {
            e.currentTarget.src = "/fallback.webp";
          }}
          loading="lazy"
          className="w-full h-[180px] md:h-[200px] object-cover group-hover:scale-[1.1] group-hover:rotate-3 duration-300"
        />
      </div>
      <p className=" max-w-[260px] font-bold">{title}</p>
    </Link>
  );
}
