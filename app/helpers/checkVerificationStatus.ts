import { API_ID_V3 } from "../constants/endpoints";
import { backOff } from "exponential-backoff";

const getStatus = async ({
  uuid,
  token,
  isScanner,
}: {
  uuid: string;
  isScanner: boolean;
  token: string | null | undefined;
}) => {
  const retryStatus = [500, 400, 401];
  const retryUntil = [
    "Checked",
    "ManualIdentification",
    "ManualChecking",
    "ExpertManualIdentification",
    "ExpertManualChecking",
  ];
  let response;

  if (isScanner) {
    response = await fetch(`${API_ID_V3}/statusScanner/${uuid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    response = await fetch(`${API_ID_V3}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uuid,
      }),
    });
  }

  if (retryStatus.includes(response.status)) {
    throw new Error(`retryStatus ${response.status}`);
  }

  if (response.ok) {
    const status = await response.text();

    if (!retryUntil.includes(status)) {
      throw new Error(`retryUntil ${status}`);
    }

    return status;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
};

const checkVerificationStatus = async ({
  uuid,
  token,
  isScanner,
}: {
  uuid: string;
  isScanner: boolean;
  token: string | null | undefined;
}) => {
  try {
    const status = await backOff(() => getStatus({ uuid, token, isScanner }), {
      delayFirstAttempt: true,
      jitter: "full",
      maxDelay: 3000,
      numOfAttempts: 30,
      startingDelay: 1000,
    });
    return status;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export default checkVerificationStatus;
