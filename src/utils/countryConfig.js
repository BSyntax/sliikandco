import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

if (!countries.getNames("en")) {
  countries.registerLocale(en);
}

export const getCountryName = (code) => {
  if (!code) return "";

  const normalizedCode = code.toUpperCase();
  return (
    countries.getName(normalizedCode, "en", { select: "official" }) ??
    normalizedCode
  );
};


export const getAllCountries = () => {
  return Object.entries(
    countries.getNames("en", { select: "official" }),
  )
    .map(([code, name]) => ({
      code,
      name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
