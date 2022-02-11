import { Box, DropdownMenu, Icon, Image, Link, Text, TopNav } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useCallback, useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { getUserInfo } from "../utilities/auth/social/google/getUserInfo";
import { UserSocialAuthProfile } from "../utilities/auth/social/types/UserSocialAuthProfile";

interface NavigationBarProps {
  firebaseLoaded: boolean;
}

const NavigationBar = ({ firebaseLoaded }: NavigationBarProps): React.ReactElement => {
  const [profileInfo, setProfileInfo] = useState<UserSocialAuthProfile | null>(null);

  const fetchUserProfileInfo = useCallback(async () => {
    if (firebaseLoaded) {
      const userinfo = getUserInfo();
      setProfileInfo(userinfo);
    }
  }, [firebaseLoaded]);

  useEffect(() => {
    fetchUserProfileInfo();
  }, [fetchUserProfileInfo, firebaseLoaded]);

  const socialTitle = "Share Flight Penguin";

  return (
    <TopNav border={"none"}>
      <TopNav.Section paddingLeft="major-2">
        <TopNav.Item fontWeight="semibold" tabIndex={-1}>
          <Image src="src/icons/logo.png" height="44px" alt="FlightPenguin Logo" tabIndex={-1} />
        </TopNav.Item>
      </TopNav.Section>

      <TopNav.Section paddingRight="major-2">
        <TopNav.Item>
          <Box height="32px" width="32px">
            <FacebookShareButton title={socialTitle} url={getSocialUrl("facebook")}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Box>
        </TopNav.Item>
        <TopNav.Item>
          <Box height="32px" width="32px">
            <TwitterShareButton title={socialTitle} url={getSocialUrl("twitter")}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Box>
        </TopNav.Item>
        <TopNav.Item>
          <Box height="32px" width="32px">
            <LinkedinShareButton title={socialTitle} url={getSocialUrl("linkedin")}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Box>
        </TopNav.Item>
        <TopNav.Item>
          <Box height="32px" width="32px">
            {" "}
          </Box>
        </TopNav.Item>
        {firebaseLoaded && profileInfo && profileInfo.email && (
          <TopNav.Item>
            <DropdownMenu
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
                      href="mailto:support@flightpenguin.com"
                    >
                      Help
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
