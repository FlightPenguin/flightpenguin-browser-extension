import { closeModal } from "../ui/modal/closeModal";

export class CheapoairModalObserver {
  private observer: MutationObserver;
  private enabled: boolean;

  constructor() {
    this.enabled = false;

    this.observer = new MutationObserver(async function (mutations) {
      for await (const mutation of mutations) {
        for await (const element of Array.from(mutation.addedNodes as NodeListOf<HTMLElement>)) {
          await closeModal(element as HTMLDivElement);
        }
      }
    });
  }

  beginObservation(): void {
    const modal = this.getModalElement();
    if (modal) {
      this.observer.observe(modal, { childList: true });
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }

  endObservation(): void {
    this.observer.disconnect();
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getModalElement(): HTMLDivElement | null {
    return document.querySelector("div[id=modal]");
  }
}
