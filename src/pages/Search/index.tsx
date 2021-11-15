import { PageContent, PageWithHeader } from "bumbag";
import React, { useEffect, useState } from "react";

import { containerWidth, searchFormWidth, sidePaddingWidth } from "../../components/constants";
import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
import SearchFormDisplay from "../../components/SearchFormDisplay";
import { SearchResults } from "../../components/SearchResults";
import { UpdateNotificationAlert } from "../../components/UpdateNotificationAlert";
import { getStandardizedFormatDate } from "../../components/utilities/forms/getStandardizedFormatDate";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

export const SearchPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);
  const [showUpdate, setShowUpdate] = useState(true);

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

  return (
    <PageWithHeader header={<NavigationBar />}>
      <PageContent breakpoint="desktop" paddingY={{ default: "major-5" }}>
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
