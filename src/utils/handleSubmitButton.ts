export function handleSubmitButton(
  e: MouseEvent,
  claims: HTMLElement[],
  result: HTMLParagraphElement,
) {
  e.preventDefault();
  const totalClaimsSuggestions = claims.reduce((total, claim) => {
    return total + claim.children.length;
  }, 0);

  if (claims.length !== totalClaimsSuggestions) {
    result.classList.add("error");
    result.innerText = "Mark all claims as true or false !";
  } else {
    result.classList.add("success");
    result.innerText = "That's better !";
  }
}
