import { Box, PageContent, PageWithHeader } from "bumbag";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { getAuthToken } from "../../auth/getAuthToken";
import { AnalyticsManager } from "../../background/AnalyticsManager";
import { MarketingFooter } from "../../components/MarketingFooter";
import { LoginModal, WelcomeModal } from "../../components/Modals";
import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
import SearchFormDisplay from "../../components/SearchFormDisplay";
import SearchResults from "../../components/SearchResults";
import { SizeAlert } from "../../components/SizeAlert";
import { UpdateNotificationAlert } from "../../components/UpdateNotificationAlert";
import { getStandardizedFormatDate } from "../../components/utilities/forms/getStandardizedFormatDate";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { isRecentlyInstalled, setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";
import { getFormContainerWidth } from "./utils/getFormContainerWidth";
import { getResultsContainerWidth } from "./utils/getResultsContainerWidth";

export const SearchPage = (): React.ReactElement => {
  const resultsWrapperRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [formContainerWidth, setFormContainerWidth] = useState<number | undefined>();
  const [resultsContainerWidth, setResultsContainerWidth] = useState<number | undefined>();

  const [showUpdate, setShowUpdate] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(isRecentlyInstalled());
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const getIsLoggedIn = useCallback(async () => {
    const bearerToken = await getAuthToken(false);
    setIsLoggedIn(!!bearerToken);
  }, [setIsLoggedIn]);

  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);

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
    if (resultsWrapperRef.current) {
      const containerWidth = resultsWrapperRef.current.clientWidth;
      setResultsContainerWidth(getResultsContainerWidth(containerWidth));
      setFormContainerWidth(getFormContainerWidth(containerWidth));
    }
  }, [resultsWrapperRef]);

  useEffect(() => {
    const handleResize = () => {
      if (resultsWrapperRef.current) {
        const containerWidth = resultsWrapperRef.current.clientWidth;
        setResultsContainerWidth(getResultsContainerWidth(containerWidth));
        setFormContainerWidth(getFormContainerWidth(containerWidth));
      }
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setResultsContainerWidth]);

  useEffect(() => {
    getIsLoggedIn();
  }, [setIsLoggedIn, getIsLoggedIn]);

  useEffect(() => {
    analytics.pageview({});
  }, []);

  if (pageWidth < 900) {
    return (
      <PageContent isFluid paddingY={{ default: "major-10" }}>
        <SizeAlert />
      </PageContent>
    );
  }

  return (
    <PageWithHeader header={<NavigationBar />} overflow="hidden">
      <Box display="flex" flexDirection="column">
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
        {!showUpdate && ((showForm && formContainerWidth) || resultsContainerWidth) && (
          <UpdateNotificationAlert
            width={`${showForm ? formContainerWidth : resultsContainerWidth}px`}
            marginBottom="50px"
          />
        )}
        {showForm && formContainerWidth && (
          <React.Fragment>
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
                analytics.track({
                  category: "flight search",
                  action: "search",
                  label: window.location.host,
                });
              }}
              containerWidth={formContainerWidth}
              onAuthError={() => {
                setIsLoggedIn(false);
              }}
            />
            <MarketingFooter />
          </React.Fragment>
        )}
        <Box display="flex" flexDirection="column" width="100%" id="results-wrapper" ref={resultsWrapperRef}>
          {!showForm && !!formData && resultsContainerWidth && (
            <>
              <SearchFormDisplay
                containerWidth={resultsContainerWidth}
                formData={formData}
                onUpdateClick={() => {
                  setShowForm(true);
                  sendIndexUnload();
                }}
              />

              <SearchResults formData={formData} resultsContainerWidth={resultsContainerWidth} />
            </>
          )}
        </Box>
      </Box>
    </PageWithHeader>
  );
};
