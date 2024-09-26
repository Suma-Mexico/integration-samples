"use client";

import "./dialog_style.css";
import { motion } from "framer-motion";
import { isArray, isEmpty } from "lodash";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { VscClose } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { WebVerification } from "vdid-sdk-web"; //SDK
import { API_URL } from "../../constants/endpoints";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import MessageCustom from "../../ui/message";
import { PropsDialogVerification } from "@/app/interfaces/sdk.interface";

const DialogVerification = ({
  openModal,
  apikey,
  identifier,
  setDataVerification,
  setVisibleVerification,
}: PropsDialogVerification) => {
  const [email, setEmail] = useState<string>("");
  const initialError = { msg: "", class: "", show: false };
  const [errorEmail, setErrorEmail] = useState(initialError);

  // Open link
  const [isCounting, setIsCounting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Send email
  const [sendingEmail, setSendingEmail] = useState(false);

  const changeEmail = (email: string) => {
    if (isEmpty(email)) {
      setErrorEmail({
        msg: "Email required",
        class: "error",
        show: true,
      });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorEmail({
        msg: "Not valid email",
        class: "error",
        show: true,
      });
    } else {
      setErrorEmail({ msg: "", class: "", show: false });
    }
    setEmail(email);
  };

  useEffect(() => {
    if (!isCounting || timeLeft === null) return;

    // Verificamos si el tiempo ha llegado a 0
    if (timeLeft === 0) {
      setTimeLeft(null);
      setIsCounting(false);
      //  VDID
      const vdid = new WebVerification(apikey);
      vdid.verifyIdentity(identifier);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const openLink = () => {
    if (isEmpty(apikey) || isEmpty(identifier)) {
      alert("Missing fields");
    }
    setTimeLeft(6);
    setIsCounting(true);
  };

  const sendEmail = async () => {
    if (isEmpty(apikey) || isEmpty(identifier)) {
      alert("Failed sending email");
      return;
    }
    try {
      setSendingEmail(true);
      const vdid = new WebVerification(apikey);
      const url = vdid.getUrl({ uuid: identifier });

      const response = await fetch(`${API_URL}/sendEmail`, {
        method: "POST",
        headers: {
          "x-api-key": `${apikey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, email }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        setSendingEmail(false);
      } else {
        const error = await response.json();

        if (!isEmpty(error?.error)) {
          let textError: string;
          if (isArray(error?.error?.message)) {
            textError = error?.error?.message[0];
          } else {
            textError = error?.error?.message;
          }

          alert(textError);
          setSendingEmail(false);
          return;
        }

        alert("sending email");
        setSendingEmail(false);
      }
    } catch (error) {
      alert(error);
      setSendingEmail(false);
    }
  };

  const closeModal = () => {
    setVisibleVerification(false);
    setDataVerification({ apikey: "", identifier: "" });
  };

  return (
    <Dialog keepMounted open={openModal}>
      <DialogTitle
        className="content_main_title_dialog"
        style={{ padding: "1rem" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Verification</p>
          <motion.span
            initial={{ y: "0" }}
            whileHover={{ scale: 1.1, y: "0" }}
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 400,
              damping: 10,
            }}
            className="btn_close_modal_custom"
            style={{ position: "relative" }}
            onClick={(e) =>
              isCounting || sendingEmail ? e.stopPropagation() : closeModal()
            }
          >
            <VscClose />
          </motion.span>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="content_dailog_verification">
          <div>
            <h4 style={{ fontWeight: "700" }}>Send by email</h4>
            <p style={{ paddingTop: "10px" }}>Send link</p>
            <div>
              <div
                style={{
                  paddingTop: "1.4rem",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  disabled={isCounting || sendingEmail}
                  className={`content_input_custom_text ${errorEmail.class}`}
                  placeholder="Type an email address"
                  maxLength={50}
                  style={{
                    padding: "0.45rem 0.6rem",
                    borderRadius: "4px 0 0 4px",
                    borderRight: "none",
                  }}
                  value={email}
                  onChange={(e) => changeEmail(e?.target?.value)}
                />
                <Button
                  onClick={() => sendEmail()}
                  color="secondary"
                  size="medium"
                  type="button"
                  disabled={
                    errorEmail.show ||
                    email === "" ||
                    sendingEmail ||
                    isCounting
                  }
                  className="btns_actions_with_background_purple"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: "0 4px 4px 0",
                    border: "1px solid var(--secondary-color)",
                  }}
                >
                  Send
                </Button>
              </div>
              {errorEmail.show && (
                <MessageCustom
                  type="error"
                  message={errorEmail.msg}
                  showIcon={false}
                  showBackgroundColor={false}
                  customPadding="10px 0px 0px 0px"
                  customMargin="0px"
                />
              )}
            </div>
          </div>
          <hr />
          <div style={{ paddingLeft: "10px" }}>
            <h4 style={{ fontWeight: "700" }}>Open link</h4>
            <p style={{ paddingTop: "10px" }}>Open link in a new tab</p>
            <div style={{ paddingTop: "1.4rem" }}>
              <Button
                onClick={() => openLink()}
                disabled={isCounting || sendingEmail}
                className="btns_actions_with_background_yellow"
                color="secondary"
                size="medium"
                type="button"
                style={{ textTransform: "capitalize" }}
              >
                {timeLeft ?? "Open"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVerification;
