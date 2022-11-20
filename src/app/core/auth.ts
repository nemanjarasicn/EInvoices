/**
 * Check if token is valid TODO user comparation and exp
 * @param token
 * @returns {boolean}
 */
const validateToken = (token: string): boolean => {
  try {
    const decodedJwt = parseJwt(token);
    return !Boolean(Math.floor(new Date().getTime() / 1000) >= decodedJwt.exp);
  } catch (error) {
    return false;
  }
};

const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join("")
  );

const parseJwt = (token: string) =>
  JSON.parse(
    b64DecodeUnicode(token.split(".")[1].replace("-", "+").replace("_", "/"))
  );

export { validateToken };
