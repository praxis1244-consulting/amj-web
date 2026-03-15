import { useEffect } from "react";

const SITE_URL = "https://amjingenieria.cl";
const DEFAULT_IMAGE = `${SITE_URL}/logo-iso.png`;

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: JsonLd;
};

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertLink(
  rel: string,
  href: string,
  attributes: Record<string, string> = {},
) {
  const selector = `link[rel="${rel}"]${Object.entries(attributes)
    .map(([key, value]) => `[${key}="${value}"]`)
    .join("")}`;
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    Object.entries(attributes).forEach(([key, value]) =>
      element?.setAttribute(key, value),
    );
    document.head.appendChild(element);
  }

  element.href = href;
}

export default function PageMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  jsonLd,
}: PageMetaProps) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).toString();

    document.title = title;
    document.documentElement.lang = "es-CL";

    upsertMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:locale", "es_CL");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "AMJ Ingeniería");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", "AMJ Ingeniería");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);
    upsertLink("alternate", url, { hreflang: "es-CL" });
    upsertLink("alternate", SITE_URL, { hreflang: "x-default" });

    const existingScript = document.head.querySelector(
      "#structured-data",
    ) as HTMLScriptElement | null;

    if (!jsonLd) {
      existingScript?.remove();
      return;
    }

    const script = existingScript ?? document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);

    if (!existingScript) {
      document.head.appendChild(script);
    }
  }, [description, image, jsonLd, path, title]);

  return null;
}
