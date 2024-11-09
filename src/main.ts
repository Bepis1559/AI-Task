import { getClonedElement } from "./utils/getClonedElement";
import { appendOptionsToClaims } from "./utils/handleAppendingElementsToClaims";
import { handleReset } from "./utils/handleReset";
import { handleSubmit } from "./utils/handleSubmit";

const options: HTMLDivElement[] = Array.from(
  document.querySelectorAll(".options > div"),
);
const claims: HTMLElement[] = Array.from(
  document.querySelectorAll(".claims li"),
);
const submitButton: HTMLButtonElement = document.querySelector(
  `.claims  button[type=submit]`,
)!;
const resetButton: HTMLButtonElement = document.querySelector(
  `.claims  button[type=reset]`,
)!;
const result: HTMLParagraphElement = document.querySelector(`.result`)!;
resetButton.addEventListener("click", (e) => handleReset(e, claims));
submitButton.addEventListener("click", (e) => handleSubmit(e, claims, result));

options.forEach((option) => {
  option.addEventListener("dragstart", (e) => {
    e.dataTransfer?.setData("text/plain", (e.target as HTMLElement).id);
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
    const data = e.dataTransfer?.getData("text/plain");
    const clonedElement = getClonedElement(data!);
    appendOptionsToClaims(clonedElement, claim);
  });
});
