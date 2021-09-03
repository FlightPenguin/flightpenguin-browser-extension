import { PageContent, PageWithHeader, Provider as BumbagProvider } from "bumbag";
import React from "react";
import ReactDom from "react-dom";

import NavigationBar from "./components/NavigationBar/index";
import { SearchForm } from "./components/SearchForm/index";
import { SearchResults } from "./components/SearchResults";
import { FlightPenguinTheme } from "./components/utilities/bumbag/theme";

const root = document.getElementById("react-root");

if (root) {
  ReactDom.render(
    <BumbagProvider theme={FlightPenguinTheme}>
      <PageWithHeader header={<NavigationBar />}>
        <PageContent breakpoint="desktop" paddingY={{ default: "major-15", "max-tablet": "major-8" }}>
          <SearchForm />
          <SearchResults />
        </PageContent>
      </PageWithHeader>
    </BumbagProvider>,
    root,
  );
}
