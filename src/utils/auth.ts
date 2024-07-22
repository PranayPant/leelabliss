export function getRedirectUrl() {
  const url = `${import.meta.env.VITE_COGNITO_LOGIN_URL}/login?client_id=${import.meta.env.VITE_COGNITO_CLIENT_ID}&response_type=code&scope=${import.meta.env.VITE_COGNITO_SCOPE}&redirect_uri=${import.meta.env.VITE_COGNITO_REDIRECT_URL}`;
  return encodeURI(url);
}
