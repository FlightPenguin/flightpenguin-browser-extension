export const closeModal = async (modalElement: HTMLDivElement): Promise<void> => {
  modalElement.remove();

  const cleanupElements = document.querySelectorAll(".modal-open");
  for (const element of cleanupElements) {
    element.classList.remove("modal-open");
  }
};
