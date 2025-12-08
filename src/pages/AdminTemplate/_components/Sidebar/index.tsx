import { useNavigate } from "react-router-dom";

const menu = [
  { title: "Dashboard", path: "/admin/dashboard" },
  { title: "Users", path: "/admin/user" },
  { title: "Locations", path: "/admin/location" },
  { title: "Rooms", path: "/admin/room" },
  { title: "Bookings", path: "/admin/booking" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 240,
        background: "#fff",
        height: "100vh",
        borderRight: "1px solid #eee",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {menu.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            cursor: "pointer",
            padding: "10px 14px",
            borderRadius: 8,
            background: "#f7f7f7",
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
