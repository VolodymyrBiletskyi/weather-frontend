import clsx from "clsx";
import { type PropsWithChildren } from "react";

type CardProps = PropsWithChildren & {
  title?: string;
  childrenClassname?: string;
  className?: string;
};

export default function Card({
  children,
  title,
  childrenClassname,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "p-4 rounded-xl bg-linear-to-br from-card bg-card shadow-md flex flex-col gap-4",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div
        className={clsx(
          childrenClassname,
          "animate-[fade-in_1s_ease-out_forwards]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
