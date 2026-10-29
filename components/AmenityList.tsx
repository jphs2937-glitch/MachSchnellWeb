import { site } from "@/content/site";

/** Climate controlled · Secure, gated, camera-monitored · Battery tender and car cover included */
export function AmenityList() {
  return (
    <ul role="list" className="ms-amenities">
      {site.amenities.map((a, i) => (
        <li key={a.title}>
          <span className="data">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="title">{a.title}</h3>
          <p className="muted">{a.text}</p>
        </li>
      ))}
    </ul>
  );
}
