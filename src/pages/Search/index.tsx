import { PageContent, PageWithHeader } from "bumbag";
import React, { useCallback, useEffect, useState } from "react";

import { getAuthToken } from "../../auth/getAuthToken";
import { containerWidth, searchFormWidth, sidePaddingWidth } from "../../components/constants";
import { LoginModal, WelcomeModal } from "../../components/Modals";
import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
import SearchFormDisplay from "../../components/SearchFormDisplay";
import SearchResults from "../../components/SearchResults";
import { UpdateNotificationAlert } from "../../components/UpdateNotificationAlert";
import { getStandardizedFormatDate } from "../../components/utilities/forms/getStandardizedFormatDate";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { isRecentlyInstalled, setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";

export const SearchPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  const [showUpdate, setShowUpdate] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(isRecentlyInstalled());
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const getIsLoggedIn = useCallback(async () => {
    const bearerToken = await getAuthToken(false);
    setIsLoggedIn(!!bearerToken);
  }, [setIsLoggedIn]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.debug(message);
      switch (message.event) {
        case "UPDATE_AVAILABLE":
          setShowUpdate(true);
          break;
        default:
          break;
      }
    });
  }, [setShowUpdate]);

  useEffect(() => {
    getIsLoggedIn();
  }, [setIsLoggedIn, getIsLoggedIn]);

  return (
    <PageWithHeader header={<NavigationBar />}>
      <PageContent breakpoint="desktop" paddingY={{ default: "major-5" }}>
        {showWelcomeModal && !isLoggedIn && (
          <WelcomeModal
            onSuccess={() => {
              setShowWelcomeModal(false);
              setIsLoggedIn(true);
              setRecentlyInstalled(false);
            }}
          />
        )}
        {!isLoggedIn && !showWelcomeModal && (
          <LoginModal
            onSuccess={() => {
              setIsLoggedIn(true);
            }}
          />
        )}
        {!showUpdate && (
          <UpdateNotificationAlert
            width={`${showForm ? searchFormWidth : containerWidth + sidePaddingWidth * 2}px`}
            marginBottom="50px"
          />
        )}
        {showForm && (
          <SearchForm
            initialValues={
              formData && {
                ...formData,
                from: { value: formData.from, label: formData.from },
                to: { value: formData.to, label: formData.to },
                cabin: formData?.cabin || "econ",
                fromDate: getStandardizedFormatDate(formData.fromDate),
                toDate: getStandardizedFormatDate(formData.toDate),
                searchByPoints: formData.searchByPoints.toString(),
              }
            }
            onSubmit={(values) => {
              setFormData(values);
              setShowForm(false);
            }}
          />
        )}
        {!showForm && !!formData && (
          <>
            <SearchFormDisplay
              formData={formData}
              onUpdateClick={() => {
                setShowForm(true);
                sendIndexUnload();
              }}
            />
            <SearchResults formData={formData} />
          </>
        )}
      </PageContent>
    </PageWithHeader>
  );
};
