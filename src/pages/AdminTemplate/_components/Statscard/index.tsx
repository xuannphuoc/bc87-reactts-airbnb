import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export default function StatsCard({ title, value, icon }: Props) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #eee",
        borderRadius: 12,
        width: 260,
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div>{icon}</div>
    </div>
  );
}
