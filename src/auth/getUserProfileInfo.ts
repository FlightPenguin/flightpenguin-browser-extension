import UserInfo = chrome.identity.UserInfo;
import AccountStatus = chrome.identity.AccountStatus;

export const getUserProfileInfo = async (): Promise<UserInfo> => {
  return await getUserProfileInfoPromise();
};

const getUserProfileInfoPromise = (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    chrome.identity.getProfileUserInfo({ accountStatus: AccountStatus.ANY }, (userInfo) => {
      resolve(userInfo);
    });
  });
};
