export default function RecipeCardSkeleton() {
  return (
    <div className="w-full max-w-[280px] h-[350px] bg-gray-200 rounded-lg animate-pulse">
      <div className="w-full h-[200px] bg-gray-300 rounded-t-lg"></div>

      <div className="p-4 flex flex-col gap-3">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
}
