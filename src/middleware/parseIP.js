export const parseIP = (event) => {
  const userIP = event.requestContext.identity.sourceIp;
  event.userIP = userIP;
};
