import { closeModal } from "../../ui/closeModal";
import { openModal } from "../../ui/openModal";

export const setModalHtml = async (flightCard: HTMLDivElement): Promise<void> => {
  if (!flightCard.dataset.fpModalHtml) {
    const modal = await openModal(flightCard);
    flightCard.dataset.fpModalHtml = modal.outerHTML;
    await closeModal(modal);
  }
};
