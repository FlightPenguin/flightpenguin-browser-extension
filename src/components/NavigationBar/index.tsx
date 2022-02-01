import { Box, DropdownMenu, Icon, Image, Link, Text, TopNav } from "bumbag";
import React, { useCallback, useEffect, useState } from "react";
import UserInfo = chrome.identity.UserInfo;
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { getUserProfileInfo } from "../../auth/getUserProfileInfo";

const NavigationBar = () => {
  const [profileInfo, setProfileInfo] = useState<UserInfo | null>(null);

  const fetchUserProfileInfo = useCallback(async () => {
    const userinfo = await getUserProfileInfo();
    setProfileInfo(userinfo);
  }, []);

  useEffect(() => {
    fetchUserProfileInfo();
  }, [fetchUserProfileInfo]);

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
        {profileInfo && profileInfo.email && (
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
  return true;
});

const getSocialUrl = (sourceName: string) => {
  return `https://www.flightpenguin.com/?utm_medium=user_app_share&utm_source=${sourceName}&utm_content=user_app_share&utm_campaign=user_app_share"`;
};
