import type { BookingData } from "@/context/BookingContext.tsx";
import { useEffect, useRef } from "react";
type Props = {
  isMobile: boolean;
  mobileOpen: boolean;
  showSearch: boolean;
  inputLocation: string;
  setInputLocation: (value: string) => void;
  booking: BookingData;
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>;
  locations: any[] | undefined;
  gotoDetail: (id: number, name: string) => void;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({
  isMobile,
  mobileOpen,
  showSearch,
  inputLocation,
  showDropdown,
  setInputLocation,
  booking,
  setBooking,
  locations,
  gotoDetail,
  setShowDropdown,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDropdown]);
  return (
    <div
      className={`
        container mx-auto transition-all duration-300 justify-center
        ${
          isMobile
            ? mobileOpen
              ? "flex"
              : "hidden"
            : showSearch
            ? "flex"
            : "hidden"
        }
      `}
    >
      <div
        className="
    w-full md:w-[90%] lg:w-[70%] xl:w-[55%]
    bg-white rounded-2xl md:rounded-full shadow-md
   
    flex flex-col md:flex-row
    gap-3 md:gap-0
    p-4 md:p-0
  "
      >
        {/* Location */}
        <div
          ref={dropdownRef}
          className="flex-1 relative flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
        >
          <div className="w-full">
            <label className="block text-xs font-semibold text-gray-800">
              Địa điểm
            </label>
            <input
              value={inputLocation}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setInputLocation(e.target.value);
                setShowDropdown(true);
              }}
              type="text"
              placeholder="Bạn muốn đi đâu?"
              className=" p-0
    w-full
    bg-transparent
    text-sm
    text-gray-800
    placeholder-gray-400
    border-none
    outline-none
    focus:ring-0
  "
            />
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-50">
                <ul className="max-h-[300px] overflow-y-auto">
                  {locations
                    ?.filter((l) =>
                      l.tenViTri
                        .toLowerCase()
                        .includes(inputLocation.toLowerCase())
                    )
                    .map((location) => (
                      <li
                        key={location.id}
                        onClick={() => {
                          setInputLocation(location.tenViTri);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                      >
                        <img
                          src={location.hinhAnh}
                          className="w-8 h-8 rounded"
                        />
                        <div>
                          <p className="font-medium">{location.tenViTri}</p>
                          <p className="text-xs text-gray-500">
                            {location.tinhThanh}, {location.quocGia}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1 px-4 py-3 hover:bg-gray-100">
          <label className="block text-xs font-semibold text-gray-800">
            Nhận phòng
          </label>
          <input
            type="date"
            className="p-0
    bg-transparent
    text-sm
    text-gray-800
    border-none
    outline-none
    focus:ring-0
    cursor-pointer
  "
            onChange={(e) => {
              const value = e.target.value;
              const today = new Date().toISOString().split("T")[0];
              if (value < today) return alert("Ngày không hợp lệ");
              setBooking((prev) => ({ ...prev, checkin: value }));
            }}
          />
        </div>

        {/* Check-out */}
        <div className="flex-1 px-4 py-3 hover:bg-gray-100">
          <label className="block text-xs font-semibold text-gray-800">
            Trả phòng
          </label>
          <input
            type="date"
            className="p-0
    bg-transparent
    text-sm
    text-gray-800
    border-none
    outline-none
    focus:ring-0
    cursor-pointer
  "
            onChange={(e) => {
              const value = e.target.value;
              if (booking.checkin && value < booking.checkin)
                return alert("Ngày trả phòng không hợp lệ");
              setBooking((prev) => ({ ...prev, checkout: value }));
            }}
          />
        </div>

        {/* Guests + Search */}
        <div className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-gray-100">
          <div>
            <label className="block text-xs font-semibold text-gray-800">
              Khách
            </label>
            <input
              type="number"
              min={1}
              className="p-0
    bg-transparent
    text-sm
    text-gray-800
    border-none
    outline-none
    focus:ring-0
    cursor-pointer
  "
              placeholder="Thêm khách"
              onChange={(e) =>
                setBooking((prev) => ({
                  ...prev,
                  guests: Number(e.target.value),
                }))
              }
            />
          </div>

          <button
            onClick={() => {
              const selected = locations?.find(
                (l) => l.tenViTri === inputLocation
              );
              if (selected) gotoDetail(selected.id, selected.tenViTri);
            }}
            className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
