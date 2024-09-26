import { ResponseGetToken, RequestToken } from "../interfaces/token.interface";

const getToken = async ({
  grant_type,
  client_id,
  client_secret,
  audience,
}: RequestToken): Promise<ResponseGetToken> => {
  try {
    const urlencoded = new URLSearchParams();

    urlencoded.append("grant_type", grant_type);
    urlencoded.append("client_id", client_id);
    urlencoded.append("client_secret", client_secret);
    urlencoded.append("audience", audience);

    const response = await fetch(
      "https://veridocid.azure-api.net/api/auth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlencoded,
        redirect: "follow",
      }
    );

    if (!response.ok) return { error: 1 };

    const token = await response.json();

    return { error: 0, token };
  } catch (error) {
    return { error };
  }
};

export default getToken;
