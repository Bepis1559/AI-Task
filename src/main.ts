import { getClonedElement } from "./utils/getClonedElement";
import { appendOptionsToClaims } from "./utils/appendOptionsToClaims";
import { handleReset } from "./utils/handleReset";
import { handleSubmit } from "./utils/handleSubmit";

// Selecting all the elements we'll need for the app
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

// adding click event listeners to the reset and submit button
resetButton.addEventListener("click", (e) => handleReset(e, claims, result));
submitButton.addEventListener("click", (e) => handleSubmit(e, claims, result));

// setting the data to be transfared on each option (true and false) on drag start
options.forEach((option) => {
  option.addEventListener("dragstart", (e) => {
    e.dataTransfer?.setData("text/plain", (e.target as HTMLElement).id);
  });
});

// preventing the default when the drag is over on each of the mage's claims
claims.forEach((claim) => {
  claim.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
});
// add a drop event listener for each claim , so that data can from the player's options can be transfered .
claims.forEach((claim) => {
  claim.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer?.getData("text/plain");
    const clonedElement = getClonedElement(data!);
    appendOptionsToClaims(clonedElement, claim);
  });
});
