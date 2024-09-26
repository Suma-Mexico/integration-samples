interface Token {
  access_token: string;
  expires_in?: number;
  token_type?: string;
  refresh_token?: string;
  scope?: string;
  id?: string;
  client_id?: string;
  client_secret?: string;
}

interface ResponseGetToken {
  error: unknown;
  token?: Token;
  basicAuth?: string;
}

interface RequestToken {
  grant_type: string;
  client_id: string;
  client_secret: string;
  audience: string;
}

export type { ResponseGetToken, RequestToken };
