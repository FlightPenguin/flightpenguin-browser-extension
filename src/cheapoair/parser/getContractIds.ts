import { ParserError } from "../../shared/errors";

const STORAGE_KEY = "fp-contracts";

export const getContractIds = (): string[] => {
  /* Content Scripts have different execution contexts than the page.
     We need to write a separate script that dumps a safe variable into the DOM to be read.

     https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
   */

  const bodyElement = document.getElementsByTagName("body")[0];

  const scriptElement = document.createElement("script");
  scriptElement.innerHTML = `
  function dumpContracts() {
    const { contracts } = window.APP_STORE.getState().airListing.contractList;
    const indexIdMap = contracts.map((contract, index) => {
      return [contract.ContractLocatorKey, contract.XmlId, index.toString()].join("-");
    });
    
    sessionStorage.setItem("fp-contracts", JSON.stringify(indexIdMap));
    }
  dumpContracts();
  `;
  bodyElement.appendChild(scriptElement);

  const contracts = getContractsData();
  scriptElement.remove();
  return contracts;
};

const getContractsData = (): string[] => {
  const storageData = sessionStorage.getItem(STORAGE_KEY);
  if (!storageData) {
    throw new ParserError("Unable to get contracts from session storage");
  }
  sessionStorage.removeItem(STORAGE_KEY);
  return JSON.parse(storageData);
};
