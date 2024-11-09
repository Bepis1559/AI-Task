export function handleReset(e: MouseEvent, claims: HTMLElement[]) {
  e.preventDefault();
  claims.forEach((claim) => claim.lastElementChild?.remove());
}
