import { API_ID_V3 } from "../constants/endpoints";
import checkVerificationStatus from "./checkVerificationStatus";
import { labelsVerify } from "../fixtures/ui.fixture";
import getToken from "./getToken";
import { client_id, client_secret } from "../constants/credentials";

const callToVerify = async ({
  anverso,
  facial,
  identifier,
  reverso,
  setIsWaiting,
  setModalState,
  setLoading,
}: {
  identifier: string;
  anverso: string | null;
  reverso: string | null;
  facial: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  setModalState: React.Dispatch<
    React.SetStateAction<{
      color: string;
      content: string;
      isChecked: boolean;
      open: boolean;
      title: string;
      subContent?: string;
    }>
  >;
}) => {
  if (!identifier) {
    alert("Missing Identifier");
    return;
  }

  if (!anverso) {
    alert("Need at least front image");
    return;
  }

  setLoading(true);
  setIsWaiting(true);

  try {
    const { token, error } = await getToken({
      audience: "veridocid",
      client_id,
      client_secret,
      grant_type: "client_credentials",
    });

    if (error) alert("Unauthorized");

    let req: {
      id: string;
      frontImage: string;
      backImage?: string;
      faceImage?: string;
    } = {
      id: identifier.trim(),
      frontImage: anverso,
    };

    if (reverso) req = { ...req, backImage: reverso };
    if (facial) req = { ...req, faceImage: facial };

    const url = `${API_ID_V3}/verify`;
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (result.ok) {
      const uuid = await result.text();
      const status = await checkVerificationStatus({
        uuid,
        token: token?.access_token,
        isScanner: false,
      });
      if (status === "Checked") {
        alert("Verification completed");
        // Reset page
        if (sessionStorage.getItem("pageRegister"))
          sessionStorage.setItem("pageRegister", String(0));
        return;
      } else if (
        [
          "ManualIdentification",
          "ManualChecking",
          "ExpertManualIdentification",
          "ExpertManualChecking",
        ].includes(status)
      ) {
        setIsWaiting(false);
        setModalState({
          isChecked: false,
          open: true,
          title: labelsVerify.notice,
          content: labelsVerify.noticeTitle,
          subContent: labelsVerify.noticeDescription,
          color: labelsVerify.orange,
        });
      } else {
        setIsWaiting(false);
        setModalState({
          isChecked: false,
          open: true,
          title: labelsVerify.notice,
          content: labelsVerify.warningTitle,
          subContent: labelsVerify.warningDescription,
          color: labelsVerify.orange,
        });
        return;
      }
    } else {
      const error = await result.text();
      if (error === "ID already exists.") {
        setIsWaiting(false);
        setModalState({
          isChecked: false,
          open: true,
          title: labelsVerify.error,
          content: labelsVerify.errorTitleSameId,
          subContent: labelsVerify.errorDescriptionSameId,
          color: labelsVerify.red,
        });
      } else {
        setIsWaiting(false);
        setModalState({
          isChecked: false,
          open: true,
          title: labelsVerify.error,
          content: labelsVerify.errorTitle,
          subContent: labelsVerify.errorDescription,
          color: labelsVerify.red,
        });
      }
    }

    setLoading(false);
    // Reset page
    if (sessionStorage.getItem("pageRegister"))
      sessionStorage.setItem("pageRegister", String(0));
  } catch (error) {
    setIsWaiting(false);
    setModalState({
      isChecked: false,
      open: true,
      title: labelsVerify.error,
      content: labelsVerify.errorTitle,
      subContent: labelsVerify.errorDescription,
      color: labelsVerify.red,
    });
    setLoading(false);
    // Reset page
    if (sessionStorage.getItem("pageRegister"))
      sessionStorage.setItem("pageRegister", String(0));

    alert({ error });
  }
};

export default callToVerify;
