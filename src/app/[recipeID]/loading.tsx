export default function Loading() {
  return (
    <div className="w-full max-w-[1500px] bg-white pb-[5rem] animate-pulse">
      <section className="w-full h-screen max-h-[1000px] relative overflow-hidden mb-15 bg-gray-300"></section>
      <section className="p-5 flex flex-col gap-5 max-lg:flex-col">
        <div className="flex-1 flex flex-col gap-5">
          <div className="h-8 w-1/4 bg-gray-300 rounded"></div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-1/2 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="h-8 w-1/4 bg-gray-300 rounded mb-4"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-300 rounded mb-2"></div>
          ))}
        </div>

        <div className="flex-1 mt-10">
          <div className="h-8 w-1/4 bg-gray-300 rounded mb-4"></div>
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[280px] h-[350px] bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
