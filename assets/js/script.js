// var workStart = 9;  // start time
// var workEnd = 17;  // end time

// show current day and date in the header
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// create timeblocks
var createTimeblocks = function(start, end) {
    // create a container
    var timeblocks = $("<div>").addClass("row");

    // create each timeblocks element until it reaches end time
    for (var i = start; i < (end + 1); i++) {
        var timeBlockEl = $("<div>")
            .addClass("hour col-2 col-md-1 py-2")
            .text(moment(i, "HH").format("HA"));
        var eventBlockEl = $("<p>")
            .addClass("description col-8 col-md-10 p-1")
            .attr("id", "event");
        var saveBtn = $("<button>")
            .addClass("saveBtn col-2 col-md-1");
        var iconEl = $("<i>")
            .addClass("ri-save-2-fill")
        saveBtn.append(iconEl);

        // get current time
        var currentTime = moment().format("YYYY MM DD kk:mm");
        var timeblockTime = moment(i, "HH").format("YYYY MM DD kk:mm");
        // console.log(currentTime);
        // console.log(timeblockTime);
        if (moment(timeblockTime).isBefore(currentTime)) {
            eventBlockEl.addClass("past");
        } else if (moment(timeblockTime).isSame(currentTime)) {
            eventBlockEl.addClass("present");
        } else {
            eventBlockEl.addClass("future");
        }

        timeblocks.append(timeBlockEl, eventBlockEl, saveBtn);
        
    }

    $("#timeblocks-container").append(timeblocks);
}

// change to textarea when clicked #event
$("#timeblocks-container").on("click", "p", function() {
    // replace p element with textarea
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .addClass("event-text col-8 col-md-10 p-1")
        .val(text);
    $(this).replaceWith(textInput);

    // auto focus the textarea
    textInput.trigger("focus");
});

$("#timeblocks-container").on("blur", "textarea", function() {
    // replace textarea with p element
    var text = $(this)
        .val();    
    var eventEl = $("<p>")
        .addClass("description col-8 col-md-10 p-1")
        .attr("id", "event")
        .text(text);
    $(this).replaceWith(eventEl);
});

// parameters indicates business hours' start time and end time
createTimeblocks(9, 17);

