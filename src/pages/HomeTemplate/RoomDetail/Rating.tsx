import { useState } from "react";
interface StarRatingProps {
  onChangeRating: (value: number) => void;
}
export default function StarRating({ onChangeRating }: StarRatingProps) {
  const [rating, setRating] = useState(0); // số sao đã chọn
  const [hover, setHover] = useState(0); // số sao khi hover
  const handleClick = (value: number) => {
    setRating(value);
    onChangeRating(value);
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={(hover || rating) >= star ? "gold" : "none"}
            stroke="gold"
            className="w-8 h-8 cursor-pointer transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.398c.499.036.701.663.322.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.48 20.495a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L2.54 10.34a.563.563 0 01.322-.988l5.518-.398a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        ))}
      </div>

      <p className="text-sm text-gray-600">
        Bạn đánh giá: <strong>{rating} sao</strong>
      </p>
    </div>
  );
}
