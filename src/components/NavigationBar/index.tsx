import { Button, Image, TopNav } from "bumbag";
import React, { useEffect, useState } from "react";
import UserInfo = chrome.identity.UserInfo;

const NavigationBar = () => {
  const [profileInfo, setProfileInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    chrome.identity.getProfileUserInfo((userInfo: UserInfo) => {
      setProfileInfo(userInfo);
    });
  }, []);

  return (
    <TopNav border={"none"}>
      <TopNav.Section paddingLeft="major-2">
        <TopNav.Item fontWeight="semibold" tabIndex={-1}>
          <Image src="src/icons/logo.png" height="44px" alt="FlightPenguin Logo" tabIndex={-1} />
        </TopNav.Item>
      </TopNav.Section>
      {profileInfo && profileInfo.email && (
        <TopNav.Section paddingRight="major-2">
          <TopNav.Item>
            <Button borderRadius="3" style={{ whiteSpace: "nowrap" }} iconAfter="solid-user" isStatic tabIndex={-1}>
              {profileInfo.email}
            </Button>
          </TopNav.Item>
        </TopNav.Section>
      )}
    </TopNav>
  );
};

export default React.memo(NavigationBar, (previous, next) => {
  return true;
});
