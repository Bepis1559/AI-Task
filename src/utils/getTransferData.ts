export function getTransferData(e: DragEvent) {
  return e.dataTransfer?.getData("text/plain");
}
