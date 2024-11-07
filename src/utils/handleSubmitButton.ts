type resultClass = "error" | "success";

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
    setFinalState(result, "Fill all claims !");
  } else {
    handleWinningConditions(result, claims);
  }
}

function setFinalState(
  result: HTMLParagraphElement,
  resultMessage = "",
  resultClass: resultClass = "error",
) {
  result.className = "result";
  result.classList.add(resultClass);
  result.innerText = resultMessage;
}
function handleWinningConditions(
  result: HTMLParagraphElement,
  claims: HTMLElement[],
) {
  let finalOutcome = true;
  const correctAnswers = claims.map((claim) =>
    claim.getAttribute("data-answer"),
  );
  const playerAnswers = claims.map(
    (claim) => (claim.lastChild as HTMLDivElement).id,
  );

  correctAnswers.forEach((_, i) => {
    if (correctAnswers[i] !== playerAnswers[i]) {
      finalOutcome = false;
    }
  });
  if (finalOutcome) {
    setFinalState(result, "Congrats , you've made it !", "success");
  } else {
    setFinalState(result, "That's not it , try again !");
  }
}
