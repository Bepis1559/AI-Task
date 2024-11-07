export function getClonedElement(transferDataFromDraggedElement: string) {
  const draggedElement = document.getElementById(
    transferDataFromDraggedElement!,
  );
  const clonedElement = draggedElement?.cloneNode(true) as HTMLElement;
  return clonedElement;
}
