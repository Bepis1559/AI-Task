// checks if a claim already has been answered
// if not - append the user's answer
// if yes - select the existing element , remove it and append the new one
// this way , the user can easily edit their answer
export function appendOptionsToClaims(
  clonedElement: HTMLElement,
  claim: HTMLElement,
) {
  clonedElement.classList.add("cloned");
  if (!claim.querySelector("[draggable]")) {
    claim.appendChild(clonedElement);
  } else {
    const existingElement = claim.querySelector(".cloned");
    if (existingElement) {
      claim.removeChild(existingElement);
      claim.appendChild(clonedElement);
    }
  }
}
