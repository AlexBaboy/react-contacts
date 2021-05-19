export type NATIONALITIES =
  | "AU"
  | "BR"
  | "CA"
  | "CH"
  | "DE"
  | "DK"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "IE"
  | "IR"
  | "NO"
  | "NL"
  | "NZ"
  | "TR"
  | "US";

export const NATIONALITIES_HUMAN_NAME: Record<NATIONALITIES, string> = {
  AU: "Australian",
  BR: "Brazilian",
  CA: "Canadian",
  CH: "Switish",
  DE: "German",
  DK: "Danish",
  ES: "Spanish",
  FI: "Finnish",
  FR: "French",
  GB: "British",
  IE: "Irish",
  IR: "Iranian",
  NO: "Norvegian",
  NL: "Dutch",
  NZ: "New Zealandian",
  TR: "Turkish",
  US: "American",
};
