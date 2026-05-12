export function addOffsetY(map) {
  const offset = map.getSize().y * 0.11;

  map.panBy([0, -offset], { animate: false });
}
