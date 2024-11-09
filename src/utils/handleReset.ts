export function handleReset(
  e: MouseEvent,
  claims: HTMLElement[],
  result: HTMLParagraphElement,
) {
  e.preventDefault();
  claims.forEach((claim) => claim.lastElementChild?.remove());
  result.innerText = "";
}
