export function handleAppendingElementsToClaims(
  clonedElement: HTMLElement,
  claim: HTMLElement,
) {
  clonedElement.classList.add("cloned");

  console.log(clonedElement);
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
