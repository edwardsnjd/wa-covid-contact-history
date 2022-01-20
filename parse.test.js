/**
 * Tests for the HTML parsing.
 */

import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";

import { parse } from "./parse.js";

const SAMPLE_PATH = "./sample.html";

const getParsed = async () => {
  const html = await Deno.readTextFile(SAMPLE_PATH);
  return parse(html);
};

Deno.test("finds correct number of entries", async () => {
  const results = await getParsed();

  assertEquals(results.length, 148);
});

Deno.test("parses text fields", async () => {
  const results = await getParsed();

  const first = results[0];
  assertEquals(first.suburb, "Willagee");
  assertEquals(first.location, "IGA Willagee, 70 Archibald St");
  assertEquals(first.dateUpdated, "20/01/2022");
  assertEquals(
    first.healthAdvice,
    "Get tested immediately and isolate for 14 days from the date of last exposure, unless directly advised otherwise by the Department of Health. If you have not been contacted by the Department of Health phone 13 COVID (13 26843).",
  );
});

Deno.test("parses correct number of times", async () => {
  const results = await getParsed();

  const first = results[0];
  assertEquals(first.times.length, 1);
});

// Deno.test("parses single simple time", async () => {
//   const results = await getParsed();
//
//   const time = results[0].times[0];
//   assertEquals(time, 'TODO');
// });
