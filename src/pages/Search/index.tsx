import { Box, PageContent } from "bumbag";
import React, { useCallback, useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { SearchForm } from "../../components/SearchForm";
import SearchFormDisplay from "../../components/SearchFormDisplay";
import SearchResults from "../../components/SearchResults";
import { SizeAlert } from "../../components/SizeAlert";
import { UpdateNotificationAlert } from "../../components/UpdateNotificationAlert";
import { getStandardizedFormatDate } from "../../components/utilities/forms/getStandardizedFormatDate";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { getResultsContainerWidth } from "./utils/getResultsContainerWidth";

export const SearchPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [resultsContainerWidth, setResultsContainerWidth] = useState<number | undefined>();

  const [showUpdate, setShowUpdate] = useState(false);

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
    <PageContent>
      <Box display="flex" flexDirection="column">
        {showUpdate && showForm && <UpdateNotificationAlert />}
        {showForm && (
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
              }}
            />
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
    </PageContent>
  );
};
