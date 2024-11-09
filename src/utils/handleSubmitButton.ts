import { getPlayersAnswers } from "./getPlayersAnswers";

type resultClass = "error" | "success";

export function handleSubmit(
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
  const playerAnswers = getPlayersAnswers(claims);

  correctAnswers.forEach((_, i) => {
    if (correctAnswers[i] !== playerAnswers[i]) {
      finalOutcome = false;
    }
  });
  const groupedAnswersByMage = groupAnswersByMage(playerAnswers);
  if (!areRulesFollowed(groupedAnswersByMage)) {
    setFinalState(result, "That's against the rules !");
  } else {
    if (finalOutcome) {
      setFinalState(result, "Congrats , you've made it !", "success");
    } else {
      setFinalState(result, "That's not it , try again !");
    }
  }
}

function groupAnswersByMage(playerAnswers: string[]) {
  const [mage1, mage2, mage3] = [
    playerAnswers.slice(0, 2),
    playerAnswers.slice(2, 4),
    playerAnswers.slice(4, 6),
  ];
  const mages = [mage1, mage2, mage3];
  return mages;
}

function areRulesFollowed(groupedAnswers: string[][]) {
  const expectedCombinations = [
    ["true", "false"],
    ["true", "true"],
    ["false", "false"],
  ];
  let combinationsCopy = structuredClone(expectedCombinations);
  groupedAnswers.forEach((group) => {
    combinationsCopy.forEach((combination) => {
      if (areArraysEqual(group, combination)) {
        combinationsCopy = combinationsCopy.filter(
          (item) => item != combination,
        );
      }
    });
  });
  console.log(combinationsCopy);
  return combinationsCopy.length == 0 ? true : false;
}

function areArraysEqual(arr1: string[], arr2: string[]) {
  return arr1
    .toSorted()
    .every((value, index) => value === arr2.toSorted()[index]);
}
