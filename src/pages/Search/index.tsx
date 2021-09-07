import { PageContent, PageWithHeader } from "bumbag";
import React, { useState } from "react";

import NavigationBar from "../../components/NavigationBar";
import { SearchForm } from "../../components/SearchForm";
import { SearchResults } from "../../components/SearchResults";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

export const SearchPage = (): React.ReactElement => {
  const [formData, setFormData] = useState<FlightSearchFormData | null>(null);

  return (
    <PageWithHeader header={<NavigationBar />}>
      <PageContent breakpoint="desktop" paddingY={{ default: "major-15", "max-tablet": "major-8" }}>
        <SearchForm
          onSubmit={(values) => {
            setFormData(values);
          }}
        />
        <SearchResults formData={formData} />
      </PageContent>
    </PageWithHeader>
  );
};
