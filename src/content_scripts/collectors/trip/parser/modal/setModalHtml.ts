import { getModalStorageKey } from "../../../../../shared/parser/modal/getModalStorageKey";
import { closeModal } from "../../ui/closeModal";
import { openModal } from "../../ui/openModal";

export const setModalHtml = async (flightCard: HTMLDivElement, flightId: string): Promise<void> => {
  const storageKeyName = getModalStorageKey(flightId, "BOTH");
  const modalHtml = sessionStorage.getItem(storageKeyName);

  if (!modalHtml) {
    const modal = await openModal(flightCard);
    sessionStorage.setItem(storageKeyName, modal.outerHTML);
    await closeModal(modal);
  }
};
