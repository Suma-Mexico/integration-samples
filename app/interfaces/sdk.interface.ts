import { Dispatch, SetStateAction } from "react";

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

interface PropsDialogVerification {
  openModal: boolean;
  identifier: string;
  apikey: string;
  setVisibleVerification: Dispatch<SetStateAction<boolean>>;
  setDataVerification: Dispatch<
    SetStateAction<{ identifier: string; apikey: string }>
  >;
}

export type { PropsSdk, OptionsInterface, PropsDialogVerification };
