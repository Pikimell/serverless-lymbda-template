export const getCookie = (name, value, expires) => {
  const currentDay = Date.now();
  const expiresDay = new Date(currentDay + expires);
  const exiresStr = expiresDay.toUTCString();

  const part1 = `${name}=${value};`;
  const part2 = `HttpOnly; Secure; SameSite=Strict;`;
  const part3 = `Expires=${exiresStr};`;

  const res = part1 + part2 + part3;
  return res;
};
