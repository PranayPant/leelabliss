export function isTokenValid(tokenExpiration: string | undefined) {
  return !!tokenExpiration && parseInt(tokenExpiration) * 1000 > Date.now();
}
