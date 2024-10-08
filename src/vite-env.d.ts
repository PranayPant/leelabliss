/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_LOGIN_URL: string;
  readonly VITE_COGNITO_REDIRECT_URL: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string;
  readonly VITE_GOOGLE_OAUTH_REDIRECT_URI: string;
  readonly VITE_STRIPE_PUBLISHABLE_API_KEY: string;
  readonly VITE_ALGOLIA_APP_ID: string;
  readonly VITE_ALGOLIA_SEARCH_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
