import { type PropsWithChildren } from "react";

type CardProps = PropsWithChildren & {
  title: string;
  childrenClassname?: string;
};

export default function Card({
  children,
  title,
  childrenClassname,
}: CardProps) {
  return (
    <div className="p-4 rounded-xl bg-linear-to-br from-card bg-card shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className={childrenClassname}>{children}</div>
    </div>
  );
}
