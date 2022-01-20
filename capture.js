/**
 * A deno script to capture the target HTML
 */

const URL =
  "https://www.wa.gov.au/government/covid-19-coronavirus/covid-19-coronavirus-locations-visited-confirmed-cases";

const response = await fetch(URL);
const text = await response.text();

console.log(text);
