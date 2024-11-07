import { getClonedElement } from "./utils/getClonedElement";
import { getTransferData } from "./utils/getTransferData";
import { handleAppendingElementsToClaims } from "./utils/handleAppendingElementsToClaims";
import { handleSubmitButton } from "./utils/handleSubmitButton";

const options: HTMLDivElement[] = Array.from(
  document.querySelectorAll(".options > div"),
);
const claims: HTMLElement[] = Array.from(
  document.querySelectorAll(".claims li"),
);
const submitButton: HTMLButtonElement = document.querySelector(
  `.claims > button[type=submit]`,
)!;
const result: HTMLParagraphElement = document.querySelector(`.result`)!;
submitButton.addEventListener("click", (e) =>
  handleSubmitButton(e, claims, result),
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
