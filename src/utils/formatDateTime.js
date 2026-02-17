const formatDateTime = (dateStr, timeStr) => {
  const d = new Date(`${dateStr}T${timeStr}:00`);

  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();

  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${weekday}, ${month} ${day} at ${time}`;
};

export default formatDateTime