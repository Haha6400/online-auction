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

export function formatTimeWithoutHour(time) {
  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = time.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatTimeInBiddingRoom(time) {
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = time.getFullYear();

  const timeString = `${hours}:${minutes}:${seconds}`;
  const dateString = `${day}/${month}/${year}`;

  return `${dateString} ${timeString}`;
}

export function getNthDay(time, n) {
  const nthDate = new Date();
  nthDate.setDate(time.getDate() + n);
  return nthDate;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
