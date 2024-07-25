import {
  googleOauthRedirectEndpoint,
  googleOauthInfoEndpoint,
  googleOauthScopes,
  googleOauthRevokeTokenEndpoint,
} from "constants/index";
import { authStore } from "store/auth";
import { GoogleUser } from "types/auth";
import urlcat from "urlcat";

export function authorizeWithGoogle() {
  authStore.setState({
    isAuthenticating: true,
    isAuthenticated: false,
    isAuthenticationError: false,
  });
  window.location.href = urlcat(googleOauthRedirectEndpoint, "auth", {
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI,
    response_type: "token",
    scope: googleOauthScopes,
    state: window.location.pathname,
  });
}

function getGoogleAccessToken() {
  const accessToken = window.location.href.match(/access_token=([^&]*)\b/)?.[1];
  const error = window.location.href.match(/error=([^&]*)\b/)?.[1];
  if (!accessToken || !!error) {
    authStore.setState({
      isAuthenticationError: true,
      isAuthenticated: false,
    });
    throw new Error("Google Authentication Failed");
  }
  authStore.setState({
    isAuthenticationError: false,
    isAuthenticated: true,
  });
  return accessToken;
}

export async function getGoogleUser() {
  let user: GoogleUser | undefined;
  try {
    const accessToken = getGoogleAccessToken();
    authStore.setState({ accessToken });
    const userInfoUri = urlcat(googleOauthInfoEndpoint, "userinfo", {
      access_token: accessToken,
    });
    const tokenInfoUri = urlcat(googleOauthInfoEndpoint, "tokeninfo", {
      access_token: accessToken,
    });
    const [user, tokenInfo] = await Promise.all([
      (await fetch(userInfoUri)).json(),
      (await fetch(tokenInfoUri)).json(),
    ]);
    authStore.setState({ user, tokenInfo, isAuthenticating: false });
  } catch (error) {
    console.error(error);
  }
  return user;
}

export async function logoutGoogleUser() {
  const token = authStore.getState().accessToken;
  const url = urlcat(googleOauthRevokeTokenEndpoint, "revoke", {
    token,
  });
  authStore.setState({
    isAuthenticated: false,
    user: undefined,
    accessToken: undefined,
    tokenInfo: undefined,
  });
  fetch(url, { method: "POST" });
}
