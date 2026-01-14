import Discover from "./Discover/discover";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

export default function HomePage() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="w-full">
      <div className="bg-black/5 px-4 py-4 sm:px-6 md:px-10 lg:px-16 lg:py-10">
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          {/* Carousel wrapper */}
          <div className="relative h-56 sm:h-72 md:h-96 lg:h-[600px] xl:h-[750px] overflow-hidden rounded-xl">
            {/* Item 1 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/images/c5.jpg"
                className="absolute w-full h-full object-cover"
                alt="..."
              />
            </div>

            {/* Item 2 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/images/c1.jpeg"
                className="absolute w-full h-full object-cover"
                alt="..."
              />
            </div>

            {/* Item 3 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/images/c6.jpg"
                className="absolute w-full h-full object-cover"
                alt="..."
              />
            </div>

            {/* Item 4 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/images/c3.jpg"
                className="absolute w-full h-full object-cover"
                alt="..."
              />
            </div>

            {/* Item 5 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/images/c4.jpg"
                className="absolute w-full h-full object-cover"
                alt="..."
              />
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                className="w-3 h-3 rounded-full bg-white/60 hover:bg-white"
                data-carousel-slide-to={i}
              />
            ))}
          </div>

          {/* Prev btn */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-3 sm:px-4 cursor-pointer group"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </span>
          </button>

          {/* Next btn */}
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-3 sm:px-4 cursor-pointer group"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Title */}
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-center mt-6 text-gray-700 animate__animated animate__fadeInDown">
          Nhờ có Host, mọi điều đều có thể
        </h1>
      </div>

      <div className="container mx-auto py-15 px-2">
        <Discover />
      </div>
    </div>
  );
}
