import { Box, PageContent, PageWithHeader } from "bumbag";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";

import { AnalyticsManager } from "../../background/AnalyticsManager";
import { MarketingFooter } from "../../components/MarketingFooter";
import { LoginModal, WelcomeModal } from "../../components/Modals";
import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
import { Airport } from "../../components/SearchForm/api/airports/Airport";
import SearchFormDisplay from "../../components/SearchFormDisplay";
import SearchResults from "../../components/SearchResults";
import { SizeAlert } from "../../components/SizeAlert";
import { UpdateNotificationAlert } from "../../components/UpdateNotificationAlert";
import { initFirebase } from "../../components/utilities/auth/initFirebase";
import { initGoogleProvider } from "../../components/utilities/auth/social/google/initGoogleProvider";
import { getStandardizedFormatDate } from "../../components/utilities/forms/getStandardizedFormatDate";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { isRecentlyInstalled, setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";
import { getFormContainerWidth } from "./utils/getFormContainerWidth";
import { getResultsContainerWidth } from "./utils/getResultsContainerWidth";

export const SearchPage = (): React.ReactElement => {
  const { auth } = initFirebase();
  const googleProvider = initGoogleProvider();

  const resultsWrapperRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [formContainerWidth, setFormContainerWidth] = useState<number | undefined>();
  const [resultsContainerWidth, setResultsContainerWidth] = useState<number | undefined>();

  const [showUpdate, setShowUpdate] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(isRecentlyInstalled());
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);

  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
      } else {
        setActiveUser(null);
      }
      setFirebaseLoaded(true);
    });
  }, []);

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
      const containerWidth = resultsWrapperRef.current.clientWidth || window.innerWidth;
      setResultsContainerWidth(getResultsContainerWidth(containerWidth));
      setFormContainerWidth(getFormContainerWidth(containerWidth));
    }
  }, [resultsWrapperRef]);

  useEffect(() => {
    const handleResize = () => {
      if (resultsWrapperRef.current) {
        const containerWidth = resultsWrapperRef.current.clientWidth || window.innerWidth;
        setResultsContainerWidth(getResultsContainerWidth(containerWidth));
        setFormContainerWidth(getFormContainerWidth(containerWidth));
      }
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setResultsContainerWidth]);

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
    <PageWithHeader
      header={<NavigationBar firebaseLoaded={firebaseLoaded} currentUser={activeUser} />}
      overflow="hidden"
    >
      <Box display="flex" flexDirection="column">
        {showWelcomeModal && firebaseLoaded && !activeUser && (
          <WelcomeModal
            firebaseAuth={auth}
            googleProvider={googleProvider}
            onSuccess={() => {
              setShowWelcomeModal(false);
              setRecentlyInstalled(false);
            }}
          />
        )}
        {firebaseLoaded && !activeUser && !showWelcomeModal && (
          <LoginModal
            firebaseAuth={auth}
            googleProvider={googleProvider}
            onSuccess={() => {
              console.debug("Authenticated");
            }}
          />
        )}
        {!showUpdate && ((showForm && formContainerWidth) || resultsContainerWidth) && (
          <UpdateNotificationAlert
            width={`${showForm ? formContainerWidth : resultsContainerWidth}px`}
            marginBottom="50px"
          />
        )}
        {firebaseLoaded && showForm && formContainerWidth && (
          <React.Fragment>
            <SearchForm
              initialValues={
                formData && {
                  ...formData,
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
              activeUser={activeUser}
            />
            <MarketingFooter />
          </React.Fragment>
        )}
        <Box
          boxSizing="border-box"
          display="flex"
          flexDirection="column"
          width="100%"
          id="results-wrapper"
          ref={resultsWrapperRef}
          paddingLeft="2rem"
          paddingRight="2rem"
        >
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
