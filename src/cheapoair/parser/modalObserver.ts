import { closeModal } from "../ui/modal/closeModal";

export class CheapoairModalObserver {
  private observer: MutationObserver;
  private enabled: boolean;

  constructor() {
    this.enabled = false;

    const modalDenyList = ["upgrade to", "be refreshed", "speak to"];

    this.observer = new MutationObserver(async function (mutations) {
      for await (const mutation of mutations) {
        for await (const element of Array.from(mutation.addedNodes as NodeListOf<HTMLElement>)) {
          if (
            element.id === "modal" &&
            modalDenyList.some((denyText) => {
              return element.textContent && element.textContent.toLowerCase().includes(denyText);
            })
          ) {
            console.error("CLOSING MODAL");
            await closeModal(element as HTMLDivElement);
          }
        }
      }
    });
  }

  beginObservation(): void {
    // TODO: do I need childlist/subtree?  that's expensive yo
    this.observer.observe(document.body, { childList: true, subtree: true });
    this.enabled = true;
  }

  endObservation(): void {
    this.observer.disconnect();
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
