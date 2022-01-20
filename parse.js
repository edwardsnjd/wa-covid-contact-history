import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

/**
 * Attempt to parse the contact locations out of the target HTML.
 */
export function parse(html) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const rows = document.querySelectorAll("#locationTable tbody tr");
  return Array.from(rows).map(parseRow);
}

const parseRow = (tr) => {
  const [
    times,
    suburb,
    location,
    dateUpdated,
    healthAdvice,
  ] = tr.querySelectorAll("td");

  return {
    times: normalizeDates(times),
    suburb: normalizeText(suburb),
    location: normalizeText(location),
    dateUpdated: normalizeText(dateUpdated),
    healthAdvice: normalizeText(healthAdvice),
  };
};

const normalizeText = (td) => {
  return td.innerText.replace("\n", ", ").replace(/\s+/g, " ");
};

const normalizeDates = (td) => {
  // TODO
  return [td.innerText];
};
