import Link from "next/link";

/** Uppercase link with a red underline and an arrow. */
export function TextLink({ href, children, className }: { href: string; children: string; className?: string }) {
  const cls = ["text-link", className].filter(Boolean).join(" ");
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
