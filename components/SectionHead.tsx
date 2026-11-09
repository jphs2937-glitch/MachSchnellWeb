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
  /**
   * Section number, e.g. "02". Shows a race-plate index with the kicker and a rule running
   * to the edge, like the section markers on a pit board.
   */
  index?: string;
};

export function SectionHead({ kicker, title, as: Tag = "h2", size = "l", lead, aside, id, index }: Props) {
  return (
    <div className="section-head">
      {index && (
        <div className="section-index">
          <span className="section-index-plate">{index}</span>
          {kicker && <span className="kicker">{kicker}</span>}
          <span className="section-index-rule" aria-hidden="true" />
        </div>
      )}
      <div className={["section-head-main", aside && "section-head-row"].filter(Boolean).join(" ")}>
        <div>
          {kicker && !index && <span className="kicker">{kicker}</span>}
          <Tag
            id={id}
            className={size === "xl" ? "display-xl" : "display-l"}
            style={{ marginTop: kicker && !index ? "var(--space-2)" : undefined }}
          >
            {title}
          </Tag>
          {lead && <p className="body-l">{lead}</p>}
        </div>
        {aside && <div>{aside}</div>}
      </div>
    </div>
  );
}
