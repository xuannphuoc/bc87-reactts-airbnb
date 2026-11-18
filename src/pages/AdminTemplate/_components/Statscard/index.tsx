import type { IconType } from "react-icons";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  icon: IconType;
  tone: string;
}) {
  return (
    <article className="admin-panel flex items-center gap-4 p-4 sm:p-5">
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}
      >
        <Icon size={21} aria-hidden="true" />
      </span>
      <dl>
        <dt className="text-sm text-slate-600">{title}</dt>
        <dd className="text-2xl font-bold tabular-nums">{value}</dd>
      </dl>
    </article>
  );
}
