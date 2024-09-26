"use client";

import Radio from "@mui/material/Radio";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import RadioGroup from "@mui/material/RadioGroup";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "react-select";
import { VscInfo } from "react-icons/vsc";
import { selectStyles } from "../ui/select.styles";
import { initialLanguage, languageOptions } from "../fixtures/language.fixture";
import { useState } from "react";
import { OptionsInterface } from "../interfaces/sdk.interface";
import getToken from "../helpers/getToken";
import { client_id, client_secret } from "../constants/credentials";

const Sdk = () => {
  const [visibleFormSDK, setVisibleFormSDK] = useState(false);
  const [idUserSDK, setIdUserSDK] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [clientNameSDK, setClientNameSDK] = useState<string>("");
  const [optionsSelfieSDK, setOptionsSelfieSDK] = useState<string>("no");
  const [optionVerifyIpSDK, setOptionVerifyIpSDK] = useState<boolean>(false);
  const [language, setLanguage] = useState<OptionsInterface>(initialLanguage);

  const onChangeInputIdUser = (event: string) =>
    setIdUserSDK(event?.replace(/\s/g, ""));
  const onChangeInputClientName = (event: string) => setClientNameSDK(event);
  const onChangeRadioButtonSelfie = (event: string) =>
    setOptionsSelfieSDK(event);
  const onChangeVerifyIp = (event: boolean) => setOptionVerifyIpSDK(event);
  const onChangeLanguage = (languageSelected: OptionsInterface | null) => {
    if (languageSelected) setLanguage(languageSelected);
  };
  const handleCancelConfig = () => setVisibleFormSDK(false);

  /*------ SDK -------*/
  const sdkCreateVerification = async ({
    idUser,
    optionSelfie,
    optionVerifyIp,
    clientName,
  }: {
    idUser: string;
    optionSelfie: boolean;
    optionVerifyIp: boolean;
    clientName?: string;
  }) => {
    try {
      setDisabled(true);
      const { error, token } = await getToken({
        audience: "veridocid",
        client_id,
        client_secret,
        grant_type: "",
      });

      if (error) alert("Unauthorized");
      const requestBody = {
        id: idUser,
        selfie: optionSelfie,
        verifyIp: optionVerifyIp,
        redirect_url: "https://plataforma.sumamexico.com/",
        token: `Bearer ${token?.access_token}`,
        clientName,
        language: language?.value ?? "es",
      };

      if (!clientName) delete requestBody.clientName;

      // if (response.ok) {
      //   const result = await response.json();

      //   //Reset values
      //   setIdUserSDK("");
      //   setDisabled(false);
      //   setClientNameSDK("");
      //   setOptionsSelfieSDK("no");
      //   setOptionVerifyIpSDK(false);

      //   //Close Modal - Form SDK
      //   setVisibleFormSDK(false);
      //   //Open modal - Verification
      //   setVisibleVerification(true);
      //   // Data capture
      //   setDataVerification({
      //     apikey: result.apiKey,
      //     identifier: result.identifier,
      //   });
      // } else {
      //   snackbar.setMessage(`${t("messageErrorData")}`, "error", {
      //     horizontal: "center",
      //     vertical: "top",
      //   });
      //   setDisabled(false);
      // }
    } catch (error) {
      alert("Cannot complete verification");
      setDisabled(false);
      console.log({ error });
    }
  };

  const handleSubmitConfig = () => {
    if (idUserSDK === "") {
      alert("Needs identifier");
    }

    //Create verification
    sdkCreateVerification({
      idUser: idUserSDK,
      optionSelfie: optionsSelfieSDK === "yes",
      optionVerifyIp: optionVerifyIpSDK,
      clientName: clientNameSDK,
    });
  };

  return (
    <div>
      <Button
        onClick={() => setVisibleFormSDK(true)}
        className="btns_actions_without_background_rose"
        color="secondary"
        size="medium"
        type="button"
        style={{ textTransform: "capitalize" }}
      >
        Test me!
      </Button>
      <Dialog keepMounted open={visibleFormSDK}>
        <DialogTitle
          className="content_main_title_dialog"
          style={{ padding: "1rem" }}
        >
          SDK
        </DialogTitle>
        <DialogContent>
          <div
            className="content_main_info_dialog"
            style={{ padding: "1.5rem 1rem 0" }}
          >
            <form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: "0.9rem",
                    padding: "0 0 0.6rem 0",
                  }}
                >
                  Identifier
                </label>
                <input
                  type="text"
                  className="content_input_custom_text"
                  placeholder={"Type and identifier"}
                  onChange={(e) => onChangeInputIdUser(e.target.value)}
                  value={idUserSDK}
                  style={{ padding: "0.6rem 0.5rem", marginBottom: "1rem" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: "0.9rem",
                    padding: "0 0 0.6rem 0",
                  }}
                >
                  Verify Client Name
                </label>
                <input
                  type="text"
                  className="content_input_custom_text"
                  placeholder={"Enter name"}
                  onChange={(e) => onChangeInputClientName(e.target.value)}
                  value={clientNameSDK}
                  style={{ padding: "0.6rem 0.5rem", marginBottom: "1rem" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: "0.9rem",
                    padding: "0 0 0.6rem 0",
                  }}
                >
                  Select language
                </label>
                <Select
                  options={languageOptions}
                  styles={selectStyles}
                  value={language}
                  className="custom_input_select_react"
                  onChange={(languageSelected) =>
                    onChangeLanguage(languageSelected)
                  }
                  isDisabled={disabled}
                />
              </div>
              {/* Selfie */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.5rem 0 0.6rem 0",
                  }}
                >
                  Enable selfie
                </label>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e) => onChangeRadioButtonSelfie(e.target.value)}
                  value={optionsSelfieSDK}
                >
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio style={{ color: "var(--light-purple-color)" }} />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio style={{ color: "var(--light-purple-color)" }} />
                    }
                    label="No"
                  />
                </RadioGroup>
              </div>
              {/* Others services */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-color-description)",
                      padding: "0.5rem 0 0.6rem 0",
                      marginRight: "8px",
                    }}
                  >
                    Enable IP Validation
                  </label>
                  <Tooltip
                    title="Verify IP"
                    arrow
                    placement="top"
                    enterTouchDelay={0}
                  >
                    <div>
                      <VscInfo style={{ cursor: "pointer" }} size={14} />
                    </div>
                  </Tooltip>
                </div>
                <Switch
                  onChange={(e) => onChangeVerifyIp(e.target.checked)}
                  checked={optionVerifyIpSDK}
                  className="custom_switch_control"
                />
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions className="content_main_actions_dialog">
          <Button
            onClick={handleCancelConfig}
            className="btns_actions_without_background_rose"
            color="secondary"
            size="medium"
            type="button"
            style={{ textTransform: "capitalize" }}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmitConfig}
            disabled={disabled}
            className="btns_actions_with_background_purple"
            color="secondary"
            size="medium"
            type="button"
            style={{ textTransform: "capitalize" }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sdk;
