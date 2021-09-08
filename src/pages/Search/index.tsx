import { PageContent, PageWithHeader } from "bumbag";
import React, { useState } from "react";

import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
import { SearchFormDisplay } from "../../components/SearchFormDisplay";
import { SearchResults } from "../../components/SearchResults";
import { getStandardizedFormatDate } from "../../components/utilities/forms/getStandardizedFormatDate";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

export const SearchPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<FlightSearchFormData | undefined>(undefined);
  const [showForm, setShowForm] = useState(true);

  return (
    <PageWithHeader header={<NavigationBar />}>
      <PageContent breakpoint="desktop" paddingY={{ default: "major-5" }}>
        {showForm && (
          <SearchForm
            initialValues={
              formData && {
                ...formData,
                cabin: formData?.cabin || "econ",
                fromDate: getStandardizedFormatDate(formData.fromDate),
                toDate: getStandardizedFormatDate(formData.toDate),
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
