export function getPlayersAnswers(claims: HTMLElement[]) {
  return claims.map((claim) => (claim.lastChild as HTMLDivElement).id);
}
