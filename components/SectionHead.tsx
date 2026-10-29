import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: ReactNode;
  /** Heading level for the title. Pages have one h1; sections use h2. */
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "l";
  lead?: ReactNode;
  /** Optional element shown at the end of the row on wide screens (usually a text link). */
  aside?: ReactNode;
  id?: string;
};

export function SectionHead({ kicker, title, as: Tag = "h2", size = "l", lead, aside, id }: Props) {
  return (
    <div className={["section-head", aside && "section-head-row"].filter(Boolean).join(" ")}>
      <div>
        {kicker && <span className="kicker">{kicker}</span>}
        <Tag id={id} className={size === "xl" ? "display-xl" : "display-l"} style={{ marginTop: kicker ? "var(--space-2)" : undefined }}>
          {title}
        </Tag>
        {lead && <p className="body-l">{lead}</p>}
      </div>
      {aside && <div>{aside}</div>}
    </div>
  );
}
