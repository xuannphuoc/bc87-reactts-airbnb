import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiCalendar,
  HiHome,
  HiLocationMarker,
  HiUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import api from "@/services/apiServices";
import AdminHeader from "../_components/AdminHeader";
import StatsCard from "../_components/Statscard";
import type { Room } from "./ManageRoom/silce";
import type { Booking } from "./ManageBooking/slice";
import type { Location } from "./ManageLocation/slice";

type DashboardData = {
  rooms: Room[];
  locations: Location[];
  bookings: Booking[];
  users: { id: number; name: string }[];
};

const formatter = new Intl.NumberFormat("vi-VN");
const formatDate = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    Promise.all([
      api.get<{ content: Room[] }>("/phong-thue", options),
      api.get<{ content: Location[] }>("/vi-tri", options),
      api.get<{ content: Booking[] }>("/dat-phong", options),
      api.get<{ content: DashboardData["users"] }>("/users", options),
    ])
      .then(([rooms, locations, bookings, users]) => {
        setData({
          rooms: rooms.data.content,
          locations: locations.data.content,
          bookings: bookings.data.content,
          users: users.data.content,
        });
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [attempt]);

  return (
    <>
      <AdminHeader
        title="Tổng quan"
        description="Theo dõi phòng, khách và các lượt đặt trên hệ thống."
      />
      {error ? (
        <div
          role="alert"
          className="admin-panel flex flex-wrap items-center justify-between gap-3 p-5"
        >
          <p>Không tải được dữ liệu tổng quan.</p>
          <button
            type="button"
            className="admin-primary"
            onClick={() => {
              setError(false);
              setAttempt(attempt + 1);
            }}
          >
            Thử lại
          </button>
        </div>
      ) : data ? (
        <DashboardContent data={data} />
      ) : (
        <p role="status" className="admin-panel p-5 text-sm text-slate-600">
          Đang tải dữ liệu tổng quan…
        </p>
      )}
    </>
  );
}

function DashboardContent({ data }: { data: DashboardData }) {
  const { rooms, locations, bookings, users } = data;
  const stats = [
    {
      title: "Phòng cho thuê",
      count: rooms.length,
      icon: HiHome,
      tone: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Vị trí",
      count: locations.length,
      icon: HiLocationMarker,
      tone: "bg-teal-50 text-teal-700",
    },
    {
      title: "Tài khoản",
      count: users.length,
      icon: HiUsers,
      tone: "bg-sky-50 text-sky-700",
    },
    {
      title: "Lượt đặt phòng",
      count: bookings.length,
      icon: HiCalendar,
      tone: "bg-amber-50 text-amber-800",
    },
  ];
  const roomsByLocation = new Map<number, number>();
  for (const room of rooms) {
    roomsByLocation.set(
      room.maViTri,
      (roomsByLocation.get(room.maViTri) ?? 0) + 1,
    );
  }
  const distribution = locations
    .map((location) => ({
      ...location,
      count: roomsByLocation.get(location.id) ?? 0,
    }))
    .sort(
      (a, b) =>
        b.count - a.count || a.tinhThanh.localeCompare(b.tinhThanh, "vi"),
    )
    .slice(0, 6);
  const largestCount = Math.max(1, ...distribution.map((item) => item.count));
  const recentBookings = [...bookings].sort((a, b) => b.id - a.id).slice(0, 5);
  const roomNames = new Map(rooms.map(({ id, tenPhong }) => [id, tenPhong]));
  const guestNames = new Map(users.map(({ id, name }) => [id, name]));

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ count, ...stat }) => (
          <StatsCard
            key={stat.title}
            {...stat}
            value={formatter.format(count)}
          />
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(18rem,1fr)_minmax(0,1.65fr)]">
        <section
          className="admin-panel p-5"
          aria-labelledby="room-distribution"
        >
          <h2 id="room-distribution" className="font-semibold">
            Phòng theo vị trí
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Tối đa 6 vị trí có nhiều phòng nhất
          </p>
          {distribution.length ? (
            <ul className="mt-5 space-y-4">
              {distribution.map((location) => (
                <li key={location.id}>
                  <div className="mb-1 flex justify-between gap-4 text-sm">
                    <span>
                      {location.tinhThanh} · {location.tenViTri}
                    </span>
                    <strong className="tabular-nums">
                      {formatter.format(location.count)}
                    </strong>
                  </div>
                  <div
                    aria-hidden="true"
                    className="h-2 overflow-hidden rounded-full bg-indigo-50"
                  >
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{
                        width: `${(location.count / largestCount) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-slate-600">Chưa có vị trí nào.</p>
          )}
        </section>

        <section
          className="admin-panel overflow-hidden"
          aria-labelledby="recent-bookings"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <h2 id="recent-bookings" className="font-semibold">
              Đặt phòng mới nhất
            </h2>
            <Link
              to="/admin/booking"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 hover:underline"
            >
              Xem tất cả <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
          {recentBookings.length ? (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Mã</th>
                    <th scope="col">Phòng / Khách</th>
                    <th scope="col">Nhận phòng</th>
                    <th scope="col">Trả phòng</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="font-semibold text-indigo-700">
                        #{booking.id}
                      </td>
                      <td>
                        <p className="font-medium">
                          {roomNames.get(booking.maPhong) ??
                            `Phòng #${booking.maPhong}`}
                        </p>
                        <p className="text-xs text-slate-600">
                          {guestNames.get(booking.maNguoiDung) ??
                            `Khách #${booking.maNguoiDung}`}
                        </p>
                      </td>
                      <td className="whitespace-nowrap">
                        {formatDate.format(
                          new Date(booking.ngayDen.slice(0, 10)),
                        )}
                      </td>
                      <td className="whitespace-nowrap">
                        {formatDate.format(
                          new Date(booking.ngayDi.slice(0, 10)),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-t border-slate-200 px-5 py-9 text-center">
              <HiCalendar
                size={26}
                className="mx-auto mb-2 text-indigo-500"
                aria-hidden="true"
              />
              <p className="font-medium">Chưa có lượt đặt phòng</p>
              <p className="mt-1 text-sm text-slate-600">
                Các lượt đặt mới sẽ xuất hiện tại đây.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
