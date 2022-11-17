/**
 * Check if token is valid
 * @param token
 * @returns {boolean}
 */
const validateToken = (token: string): boolean => {
  const decodedJwt = parseJwt(token);
  return !Boolean(Math.floor(new Date().getTime() / 1000) >= decodedJwt.exp);
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
