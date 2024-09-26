interface OptionsInterface {
  label: string | JSX.Element;
  value: string;
  name?: string;
}

interface PropsSdk {
  disabled: boolean;
  idUserSDK: string;
  clientNameSDK: string;
  isVisibleModalConfig: boolean;
  language: OptionsInterface;
  handleCancelConfig: () => void;
  handleSubmitConfig: () => void;
  onChangeInputIdUser: (event: string) => void;
  onChangeRadioButtonSelfie: (event: string) => void;
  onChangeVerifyIp: (event: boolean) => void;
  onChangeInputClientName: (event: string) => void;
  onChangeLanguage: (languageSelected: OptionsInterface | null) => void;
  optionsSelfieSDK: string;
  optionVerifyIpSDK: boolean;
}

export type { PropsSdk, OptionsInterface };
