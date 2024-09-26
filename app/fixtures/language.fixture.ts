import { OptionsInterface } from "../interfaces/sdk.interface";

const languageOptions: Array<OptionsInterface> = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
];

const initialLanguage: OptionsInterface = {
  label: "Español",
  value: "es",
};

export { languageOptions, initialLanguage };
