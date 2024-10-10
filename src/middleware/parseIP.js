import useragent from 'useragent';

export const parseIP = (event) => {
  const userIP = event.requestContext.identity.sourceIp;
  event.userIP = userIP;
};

export const parseDevice = (event) => {
  const userAgentHeader = event.headers['User-Agent'];
  const agent = useragent.parse(userAgentHeader);

  event.userDevice = agent.device.toString();
  event.userOS = agent.os.toString();
  event.userBrowser = agent.toAgent();
};
