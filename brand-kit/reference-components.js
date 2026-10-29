/* @ds-bundle: {"format":4,"namespace":"MachSchnell","components":[{"name":"Badge"},{"name":"StripeRule"},{"name":"Button"},{"name":"NavBar"},{"name":"EventCard"},{"name":"SocialPost"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var seq = 0;
  function useUid(prefix) {
    var ref = React.useRef(null);
    if (ref.current === null) { seq += 1; ref.current = prefix + seq; }
    return ref.current;
  }
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  var RING_TEXT = "MACH SCHNELL · AUTOMOTIVE CLUB · EST 2026 · ";

  /* The striped MS: letters clipped, black fill with a bone / red / bone band */
  function StripedMS(props) {
    var id = props.id, size = props.size, y = props.y;
    var by = y - size * 0.36, hh = size * 0.07;
    return h(React.Fragment, null,
      h("clipPath", { id: id },
        h("text", { x: 100, y: y, textAnchor: "middle", fontSize: size, fontWeight: 900, letterSpacing: -1,
          style: { fontFamily: "var(--font-display)" } }, "MS")),
      h("g", { clipPath: "url(#" + id + ")" },
        h("rect", { width: 200, height: 200, style: { fill: "var(--black)" } }),
        h("rect", { y: by - hh, width: 200, height: hh, style: { fill: "var(--bone)" } }),
        h("rect", { y: by, width: 200, height: hh * 1.4, style: { fill: "var(--signal-red)" } }),
        h("rect", { y: by + hh * 1.4, width: 200, height: hh, style: { fill: "var(--bone)" } })));
  }

  function Badge(props) {
    var variant = props.variant || "full";
    var size = props.size || 160;
    var uid = useUid("ms-badge-");
    var label = props.title || "Mach Schnell Automotive Club";
    var body;
    if (variant === "mark") {
      body = [
        h("circle", { key: "o", cx: 100, cy: 100, r: 100, style: { fill: "var(--black)" } }),
        h("circle", { key: "i", cx: 100, cy: 100, r: 80, strokeWidth: 7, style: { fill: "var(--bone)", stroke: "var(--signal-red)" } }),
        h(StripedMS, { key: "ms", id: uid + "-c", size: 72, y: 126 })
      ];
    } else {
      body = [
        h("circle", { key: "o", cx: 100, cy: 100, r: 92, style: { fill: "var(--black)" } }),
        h("path", { key: "p", id: uid + "-p", d: "M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0", fill: "none" }),
        h("text", { key: "t", fontSize: 12.5, fontWeight: 700, textLength: 447, lengthAdjust: "spacing",
          style: { fill: "var(--bone)", fontFamily: "var(--font-display)" } },
          h("textPath", { href: "#" + uid + "-p" }, RING_TEXT)),
        h("circle", { key: "i", cx: 100, cy: 100, r: 58, strokeWidth: 4, style: { fill: "var(--bone)", stroke: "var(--signal-red)" } }),
        h(StripedMS, { key: "ms", id: uid + "-c", size: 52, y: 119 })
      ];
    }
    return h("svg", { className: cx("ms-badge", props.className), viewBox: "0 0 200 200", width: size, height: size,
      role: "img", "aria-label": label }, body);
  }

  function StripeRule(props) {
    return h("div", { className: cx("ms-stripe", props.className), style: props.width ? { width: props.width } : undefined, "aria-hidden": "true" },
      h("span", { className: "ms-stripe-1" }), h("span", { className: "ms-stripe-2" }));
  }

  function Button(props) {
    var variant = props.variant || "primary", size = props.size || "md";
    var rest = {};
    for (var k in props) if (k !== "variant" && k !== "size" && k !== "className" && k !== "children" && k !== "href") rest[k] = props[k];
    rest.className = cx("ms-btn", "ms-btn-" + variant, "ms-btn-" + size, props.className);
    if (props.href) { rest.href = props.href; return h("a", rest, props.children); }
    if (!rest.type) rest.type = "button";
    return h("button", rest, props.children);
  }

  function NavBar(props) {
    var links = props.links || [];
    return h("header", { className: cx("ms-nav", props.className) },
      h("a", { className: "ms-nav-brand", href: props.homeHref || "#" },
        h(Badge, { variant: "mark", size: 36, title: "Mach Schnell home" }),
        h("span", { className: "ms-nav-word" }, "MACH ", h("span", { className: "ms-red" }, "SCHNELL"))),
      h("nav", { className: "ms-nav-links", "aria-label": "Main" },
        links.map(function (l) {
          return h("a", { key: l.label, href: l.href || "#", "aria-current": l.label === props.current ? "page" : undefined }, l.label);
        })),
      props.cta ? h(Button, { variant: "primary", size: "sm", href: props.cta.href || "#" }, props.cta.label) : null);
  }

  function EventCard(props) {
    var meta = props.meta || [];
    return h("article", { className: cx("ms-event", props.className), "data-theme": props.tone === "dark" ? "night" : undefined },
      h("div", { className: "ms-event-top" },
        h("div", null,
          props.kicker ? h("div", { className: "ms-kicker" }, props.kicker) : null,
          h("h3", { className: "ms-event-title" }, props.title)),
        props.number != null ? h("div", { className: "ms-plate", "aria-label": "Event number " + props.number }, props.number) : null),
      h(StripeRule, null),
      meta.length ? h("div", { className: "ms-data ms-event-meta" }, meta.join(" · ")) : null,
      props.children ? h("p", { className: "ms-event-body" }, props.children) : null,
      props.cta ? h(Button, { variant: "primary", size: "sm", href: props.cta.href }, props.cta.label) : null);
  }

  function SocialPost(props) {
    var template = props.template || "event";
    var size = props.size || 320;
    var theme = template === "members" ? "night" : "day";
    var lines = String(props.title || "").split("\n");
    var style = { width: size, height: size, fontSize: size / 320 + "rem" };
    var title = h("div", { className: "ms-post-title" }, lines.map(function (l, i) { return h("span", { key: i }, l); }));
    if (template === "car") {
      return h("div", { className: cx("ms-post", "ms-post-car", props.className), style: style },
        h("div", { className: "ms-post-kicker" }, props.kicker || "CAR OF THE WEEK"),
        h("div", { className: "ms-post-number" }, "No." + (props.number != null ? props.number : "")),
        h("div", { className: "ms-post-foot" }, h("span", null, props.footer || ""), h(Badge, { variant: "mark", size: size * 0.16 })));
    }
    return h("div", { className: cx("ms-post", "ms-post-" + template, props.className), style: style, "data-theme": theme },
      h("div", { className: "ms-post-stripe" }, h(StripeRule, null)),
      h("div", { className: "ms-post-head" },
        h("div", { className: "ms-post-kicker" }, props.kicker || ""),
        h(Badge, { variant: "mark", size: size * 0.16 })),
      title,
      props.cta ? h("div", { className: "ms-post-cta" }, props.cta) : h("span"));
  }

  window.MachSchnell = { Badge: Badge, StripeRule: StripeRule, Button: Button, NavBar: NavBar, EventCard: EventCard, SocialPost: SocialPost };
})();
