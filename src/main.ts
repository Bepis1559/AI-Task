import { getClonedElement } from "./utils/getClonedElement";
import { getTransferData } from "./utils/getTransferData";
import { handleAppendingElementsToClaims } from "./utils/handleAppendingElementsToClaims";

const options: HTMLDivElement[] = Array.from(
  document.querySelectorAll(".options > div"),
);
const claims: HTMLElement[] = Array.from(
  document.querySelectorAll(".claims li"),
);

options.forEach((options) => {
  options.addEventListener("dragstart", (e) => {
    const target = e.target as HTMLElement;
    if (target) {
      e.dataTransfer?.setData("text/plain", target.id);
    }
  });
});

claims.forEach((claim) => {
  claim.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
});

claims.forEach((claim) => {
  claim.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = getTransferData(e);
    const clonedElement = getClonedElement(data!);
    handleAppendingElementsToClaims(clonedElement, claim);
  });
});
