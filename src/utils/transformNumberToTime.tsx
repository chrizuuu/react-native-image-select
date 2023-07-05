export function transformNumberToTime(value: number) {
  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = Math.floor(value % 60);

  if (h < 1) {
    return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
  }

  return (
    h.toString().padStart(2, "0") +
    ":" +
    m.toString().padStart(2, "0") +
    ":" +
    s.toString().padStart(2, "0")
  );
}
