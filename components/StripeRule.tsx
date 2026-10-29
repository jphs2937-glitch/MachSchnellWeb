type Props = {
  /** "bleed" runs edge to edge of the viewport, even inside a container. */
  bleed?: boolean;
  className?: string;
};

/** The club stripe: red band over black (bone on night), 8px each, 4px gap. Decorative. */
export function StripeRule({ bleed = false, className }: Props) {
  return (
    <div className={["ms-stripe", bleed && "ms-stripe-bleed", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="ms-stripe-1" />
      <span className="ms-stripe-2" />
    </div>
  );
}
