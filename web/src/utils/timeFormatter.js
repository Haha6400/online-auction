export function formatTime(time) {
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");

  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = time.getFullYear();

  const timeString = `${hours}:${minutes}`;
  const dateString = `${day}/${month}/${year}`;

  return `${timeString} ${dateString}`;
}
