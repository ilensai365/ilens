import type { ReactNode } from "react";

export default function SectionHead({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p data-reveal className="eyebrow">
        {eyebrow}
      </p>
      <h2 data-reveal className="mt-5 text-h1 font-medium">
        {title}
      </h2>
      {intro && (
        <p data-reveal className={`text-muted mt-5 max-w-xl text-[17px] ${center ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
