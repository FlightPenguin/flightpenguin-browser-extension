import UserInfo = chrome.identity.UserInfo;
import AccountStatus = chrome.identity.AccountStatus;

export const getUserProfileInfo = async (): Promise<UserInfo> => {
  const userinfo = await getUserProfileInfoPromise();
  if (!userinfo || !userinfo?.email || !userinfo.id) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureMessage(`Unable to extract userinfo`);
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
