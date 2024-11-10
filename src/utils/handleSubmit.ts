type resultClass = "error" | "success";

// function to handle the submit button
// prevents the default
// gets dinamically the count of all the claims that have been filled by the user
// if the count of all claims  , in that case 6 , is not equal to the count of user's answers , then
// a message of "Fill all claims !" is displayed
// else - go into handleWinningConditions() and check if the the answers are correct
export function handleSubmit(
  e: MouseEvent,
  claims: HTMLElement[],
  result: HTMLParagraphElement,
) {
  e.preventDefault();
  const userAnswersCount = claims.reduce((total, claim) => {
    return total + claim.children.length;
  }, 0);

  if (claims.length !== userAnswersCount) {
    setFinalState(result, "Fill all claims !");
  } else {
    handleWinningConditions(result, claims);
  }
}

// helper function for adding the proper class and text to the result
function setFinalState(
  result: HTMLParagraphElement,
  resultMessage = "",
  resultClass: resultClass = "error",
) {
  result.className = "result";
  result.classList.add(resultClass);
  result.innerText = resultMessage;
}

// first we get the player's answers from the claims
// then we check if the rules are followed
// if they are not - set the final result to "That's against the rules !"
// else
// set a boolean - finalOutcome to true
// we get the correct answers from the data-answer attribute , which every list item - claim has
// we check the correct answers against the player's ones and look for a 100% match
// if there is no such one , we set the finalOutcome to false
// at the end - if finalOutcome is true , then we use the setFinalState helper function to output a success to the player
// if it's not true - we set the result to "That's not it , try again !"

function handleWinningConditions(
  result: HTMLParagraphElement,
  claims: HTMLElement[],
) {
  const playerAnswers = claims.map(
    (claim) => (claim.lastChild as HTMLDivElement).id,
  );
  const groupedAnswersByMage = groupAnswersByMage(playerAnswers);
  if (!areRulesFollowed(groupedAnswersByMage)) {
    setFinalState(result, "That's against the rules !");
  } else {
    let finalOutcome = true;
    const correctAnswers = claims.map((claim) =>
      claim.getAttribute("data-answer"),
    );

    correctAnswers.forEach((_, i) => {
      if (correctAnswers[i] !== playerAnswers[i]) {
        finalOutcome = false;
      }
    });
    if (finalOutcome) {
      setFinalState(result, "Yup , A has it !", "success");
    } else {
      setFinalState(result, "That's not it , try again !");
    }
  }
}

// separate the player's answers into 3 different groups , one for each mage and his claims
function groupAnswersByMage(playerAnswers: string[]) {
  const [mage1, mage2, mage3] = [
    playerAnswers.slice(0, 2),
    playerAnswers.slice(2, 4),
    playerAnswers.slice(4, 6),
  ];
  const mages = [mage1, mage2, mage3];
  return mages;
}

// set the expected / allowed combinations
// make a copy
// then we enter the array with the grouped answers with a loop
// an inner loop to enter the combinationsCopy array
// then we compare a mage group and a possible combination
// if the arrays are equal , we remove the found combination
// from the combinations array , since that means we already
// found an answer , and each asnwer should exist only once
// at the end , we check the combinationsCopy length
// if it is 0 , which means all combinations have been found once
// in the user's answers , - then we return true , i.e.
// rules are followed , otherwise - return false.
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

// check if two arrays are equal , but also sorting them beforehand , since
// in our case - [true,false] and [false,true] should both be counted as the same case
function areArraysEqual(arr1: string[], arr2: string[]) {
  return arr1
    .toSorted()
    .every((value, index) => value === arr2.toSorted()[index]);
}
