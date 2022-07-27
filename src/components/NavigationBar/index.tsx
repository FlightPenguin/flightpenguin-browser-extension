import { Box, DropdownMenu, Icon, Image, Link, Text, TopNav } from "bumbag";
import { User } from "firebase/auth";
import isEqual from "lodash.isequal";
import React, { useCallback, useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { SocialMediaShareModal } from "../HelpUsOut/Actions/SocialMediaShare/Modal";
import { logout } from "../utilities/auth/logout";
import { getUserInfo } from "../utilities/auth/social/google/getUserInfo";
import { UserSocialAuthProfile } from "../utilities/auth/social/types/UserSocialAuthProfile";

interface NavigationBarProps {
  firebaseLoaded: boolean;
  currentUser: User | null;
}

const NavigationBar = ({ firebaseLoaded, currentUser }: NavigationBarProps): React.ReactElement => {
  const [profileInfo, setProfileInfo] = useState<UserSocialAuthProfile | null>(null);
  const [logoutDisabled, setLogoutDisabled] = useState(false);

  const fetchUserProfileInfo = useCallback(async () => {
    if (firebaseLoaded && currentUser) {
      const userinfo = getUserInfo();
      setProfileInfo(userinfo);
    }
  }, [firebaseLoaded, currentUser]);

  useEffect(() => {
    fetchUserProfileInfo();
  }, [fetchUserProfileInfo, firebaseLoaded, currentUser]);

  return (
    <TopNav border={"none"}>
      <TopNav.Section paddingLeft="major-2">
        <TopNav.Item fontWeight="semibold" tabIndex={-1}>
          <Image
            src={browser.runtime.getURL("./icons/logo.png")}
            height="44px"
            alt="FlightPenguin Logo"
            tabIndex={-1}
          />
        </TopNav.Item>
      </TopNav.Section>

      <TopNav.Section paddingRight="major-2">
        <TopNav.Item tabIndex={-1}>
          <SocialMediaShareModal button={{ text: "Share" }} />
        </TopNav.Item>
        <TopNav.Item tabIndex={-1}>
          <Box height="32px" width="32px">
            {" "}
          </Box>
        </TopNav.Item>
        {firebaseLoaded && currentUser && profileInfo && profileInfo.email && (
          <TopNav.Item tabIndex={-1}>
            <DropdownMenu
              tabIndex={0}
              menu={
                <React.Fragment>
                  <DropdownMenu.Group title="Profile" cursor="default">
                    <DropdownMenu.Item
                      style={{ whiteSpace: "nowrap" }}
                      use={Link}
                      iconBefore="solid-user"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      href="https://subscribe.flightpenguin.com"
                      target="_blank"
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
                      href="mailto:flightpenguinhinhilla@gmail.com"
                    >
                      Help
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      iconBefore="solid-sign-out-alt"
                      disabled={logoutDisabled}
                      onClick={async () => {
                        setLogoutDisabled(true);
                        await logout();
                        setLogoutDisabled(false);
                      }}
                    >
                      Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                </React.Fragment>
              }
            >
              <Text>
                <Icon aria-label="settings" icon="solid-cog" fontSize="500" />
              </Text>
            </DropdownMenu>
          </TopNav.Item>
        )}
      </TopNav.Section>
    </TopNav>
  );
};

export default React.memo(NavigationBar, (previous, next) => {
  return isEqual(previous, next);
});

const getSocialUrl = (sourceName: string) => {
  return `https://www.flightpenguin.com/?utm_medium=user_app_share&utm_source=${sourceName}&utm_content=user_app_share&utm_campaign=user_app_share"`;
};
