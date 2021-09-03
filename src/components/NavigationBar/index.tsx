import { Button, Image, TopNav } from "bumbag";
import React, { useEffect, useState } from "react";
import UserInfo = chrome.identity.UserInfo;

export default function NavigationBar() {
  const [profileInfo, setProfileInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    chrome.identity.getProfileUserInfo((userInfo: UserInfo) => {
      setProfileInfo(userInfo);
    });
  }, []);

  return (
    <TopNav border={"none"}>
      <TopNav.Section paddingLeft="major-2">
        <TopNav.Item href="https://flightpenguin.com" fontWeight="semibold">
          <Image src="src/icons/logo.png" height="44px" alt="FlightPenguin Logo" />
        </TopNav.Item>
      </TopNav.Section>
      {profileInfo && profileInfo.email && (
        <TopNav.Section paddingRight="major-2">
          <TopNav.Item>
            <Button borderRadius="3" style={{ whiteSpace: "nowrap" }} iconAfter="solid-user" isStatic>
              {profileInfo.email}
            </Button>
          </TopNav.Item>
        </TopNav.Section>
      )}
    </TopNav>
  );
}
