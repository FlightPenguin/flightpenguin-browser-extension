import { getModalStorageKey } from "../../../../shared/parser/modal/getModalStorageKey";
import { closeModal } from "./closeModal";
import { getLayoversDetailModal } from "./getLayoversDetailModal";

export const setModalHtml = async (flightCard: HTMLDivElement, flightId: string): Promise<void> => {
  const storageKeyName = getModalStorageKey(flightId, "BOTH");
  const modalHtml = sessionStorage.getItem(storageKeyName);

  if (!modalHtml) {
    const modal = await getLayoversDetailModal(flightCard);
    sessionStorage.setItem(storageKeyName, modal.outerHTML);
    await closeModal(modal);
  }
};
