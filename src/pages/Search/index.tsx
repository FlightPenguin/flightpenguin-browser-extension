import { Box, PageContent, PageWithHeader } from "bumbag";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { AnalyticsManager } from "../../background/AnalyticsManager";
import { MarketingFooter } from "../../components/MarketingFooter";
import { LoginModal, WelcomeModal } from "../../components/Modals";
import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
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
import { getResultsContainerWidth } from "./utils/getResultsContainerWidth";

export const SearchPage = (): React.ReactElement => {
  const { auth } = initFirebase();
  const googleProvider = initGoogleProvider();

  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [resultsContainerWidth, setResultsContainerWidth] = useState<number | undefined>();

  const [showUpdate, setShowUpdate] = useState(false);
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
    browser.runtime.onMessage.addListener((message) => {
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
    analytics.pageview({});
  }, []);

  const handleSetContainerWidths = useCallback((element) => {
    if (element) {
      setResultsContainerWidth(getResultsContainerWidth(element.clientWidth));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateSearch = () => {
    setShowForm(true);
    sendIndexUnload();
  };

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
        {showUpdate && showForm && <UpdateNotificationAlert />}
        {firebaseLoaded && showForm && (
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
          id="search-wrapper"
          ref={handleSetContainerWidths}
          paddingLeft="2rem"
          paddingRight="2rem"
        >
          {!showForm && !!formData && resultsContainerWidth && (
            <>
              <SearchFormDisplay formData={formData} onUpdateClick={updateSearch} />

              <SearchResults
                formData={formData}
                resultsContainerWidth={resultsContainerWidth}
                onUpdateFormClick={updateSearch}
              />
            </>
          )}
        </Box>
      </Box>
    </PageWithHeader>
  );
};
