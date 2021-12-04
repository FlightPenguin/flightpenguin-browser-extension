import { Button, DropdownMenu, Image, Link, TopNav } from "bumbag";
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
            <DropdownMenu
              menu={
                <React.Fragment>
                  <DropdownMenu.Group title="Profile" cursor="default">
                    <DropdownMenu.Item
                      style={{ whiteSpace: "nowrap" }}
                      // use={Link}
                      iconBefore="solid-user"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      // href="https://subscribe.flightpenguin.com"
                      // target="_blank"
                    >
                      {profileInfo.email}
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Group title="Actions">
                    <DropdownMenu.Item
                      use={Link}
                      iconBefore="regular-life-ring"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      href="mailto:support@flightpenguin.com"
                    >
                      Help
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                </React.Fragment>
              }
            >
              <Button borderRadius="3" style={{ whiteSpace: "nowrap" }} iconAfter="chevron-down" isStatic tabIndex={-1}>
                Settings
              </Button>
            </DropdownMenu>
          </TopNav.Item>
        </TopNav.Section>
      )}
    </TopNav>
  );
};

export default React.memo(NavigationBar, (previous, next) => {
  return true;
});
