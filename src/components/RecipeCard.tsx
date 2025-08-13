"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
export default function RecipeCard({
  id,
  title,
  image,
}: {
  id: string;
  title: string;
  image: string;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="relative z-40  max-w-[300px] w-full">
      <Link
        href={`/${id}`}
        key={id}
        className=" group justify-self-center align-self-start border border-red-600 overflow-hidden pb-3 rounded-lg w-full h-full bg-container flex flex-col justify-start items-center text-center gap-y-[20px] hover:bg-containerHover duration-300"
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
      <FaHeart
        size={35}
        className={`duration-150 p-2 bg-black/50 backdrop-filter-[15px] top-1 right-1 ${
          liked ? "text-red-500" : "text-white"
        } rounded-lg z-999 absolute `}
        onClick={() => setLiked(!liked)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
