/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_LOGIN_URL: string;
  readonly VITE_COGNITO_REDIRECT_URL: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_COGNITO_SCOPE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
