export function seconds(n) {
  return n * 1000;
}

export function range(n) {
  return new Array(n).fill(0).map((_, i) => i);
}
