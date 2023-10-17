function updateDate() {
  var currentDate = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var formattedDate = currentDate.toLocaleDateString(undefined, options);
  document.getElementById("date").textContent = formattedDate;
}

// Call updateDate initially
updateDate();

// Update the date every second
setInterval(updateDate, 1000);
