import { closeModal } from "./closeModal";
import { getLayoversDetailModal } from "./getLayoversDetailModal";

export const setModalHtml = async (flightCard: HTMLDivElement): Promise<void> => {
  if (!flightCard.dataset.fpModalHtml) {
    const modal = await getLayoversDetailModal(flightCard);
    flightCard.dataset.fpModalHtml = modal.outerHTML;
    await closeModal(modal);
  }
};
