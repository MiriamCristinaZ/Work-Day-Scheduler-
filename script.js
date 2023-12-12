$(document).ready(function () {
  // Display current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY, h:mm A"));

  // Function to create time blocks
  function createTimeBlocks() {
    var currentTime = dayjs(); // Get current time

    // Loop through standard business hours (9 AM to 5 PM)
    for (var hour = 9; hour <= 17; hour++) {
      var blockTime = dayjs().hour(hour);

      var timeBlock = $("<div>").addClass("row time-block");
      var timeCol = $("<div>")
        .addClass("col-md-1 hour")
        .text(blockTime.format("hA"));

      var eventCol = $("<textarea>").addClass("col-md-10 description");

      // Set background color based on past, present, or future
      if (blockTime.isBefore(currentTime, "hour")) {
        eventCol.addClass("past");
      } else if (blockTime.isSame(currentTime, "hour")) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }
      var saveBtn = $("<button>")
        .addClass("col-md-1 saveBtn")
        .html('<i class="fas fa-save"></i>');

      // Retrieve events from local storage
      var storedEvent = localStorage.getItem("event" + hour);
      if (storedEvent !== null) {
        eventCol.val(storedEvent);
      }

      // Save button click event
      saveBtn.on("click", function () {
        var eventText = $(this).siblings(".description").val();
        var hourIndex = $(this).parent().index();
        localStorage.setItem("event" + (hourIndex + 9), eventText);
      });

      // Append columns to time block
      timeBlock.append(timeCol, eventCol, saveBtn);

      // Append time block to container
      $(".container").append(timeBlock);
    }
  }

  // Call function to create time blocks
  createTimeBlocks();
});
