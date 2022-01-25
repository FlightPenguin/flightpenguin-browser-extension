import UserInfo = chrome.identity.UserInfo;
import AccountStatus = chrome.identity.AccountStatus;
import { getAuthToken } from "./getAuthToken";
import { getUserInfo } from "./getUserInfo";

export const getUserProfileInfo = async (): Promise<UserInfo> => {
  const userinfo = await getUserProfileInfoPromise();
  if (!userinfo || !userinfo?.email || !userinfo.id) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureMessage(`Unable to extract userinfo`);
  }

  const accessToken = await getAuthToken(false);
  const endpointUserInfo = await getUserInfo(accessToken);
  if (endpointUserInfo?.email !== userinfo.email) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureMessage(`Userinfo does not match!`);
  }

  return userinfo;
};

const getUserProfileInfoPromise = (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    chrome.identity.getProfileUserInfo({ accountStatus: AccountStatus.ANY }, (userInfo) => {
      resolve(userInfo);
    });
  });
};
