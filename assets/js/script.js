// show current day and date in the header
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// create timeblocks
var createTimeblocks = function(start, end) {
    // create each timeblocks element until it reaches end time
    for (var i = start; i < (end + 1); i++) {
        // create a container
        var timeBlockEl = $("<div>")
            .addClass("block-container row");

        var timeEl = $("<time>")
            .addClass("hour col-2 col-md-1 px-1 py-3")
            .attr("datetime", moment(i, "HH").format("YYYY MM DD kk:mm"))
            .text(moment(i, "HH").format("HA"));
        var eventEl = $("<p>")
            .addClass("description col-8 col-md-10 p-2")
            .attr("id", "event");
        var saveBtn = $("<button>")
            .addClass("saveBtn col-2 col-md-1");
        var iconEl = $("<i>")
            .addClass("ri-save-2-fill");
        saveBtn.append(iconEl);

        checkCurrentTime(i, eventEl);

        timeBlockEl.append(timeEl, eventEl, saveBtn);
        $("#timeblocks-container").append(timeBlockEl);
    }
}

// change to textarea when clicked #event
$("#timeblocks-container").on("click", "p", function() {
    // replace p element with textarea
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .addClass("event-text col-8 col-md-10 p-2")
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
        .addClass("description col-8 col-md-10 p-2")
        .attr("id", "event")
        .text(text);
    var time = $(this).parent().find(".hour").text().trim();
    
    checkCurrentTime(time, eventEl);
    
    $(this).replaceWith(eventEl);
});

var checkCurrentTime = function(time, eventEl) {
    // get current time
    var currentTime = moment().format("YYYY MM DD kk:mm");
    var timeblockTime = moment(time, "HH").format("YYYY MM DD kk:mm");
    // console.log(currentTime);
    // console.log(timeblockTime);
    if (moment(timeblockTime).isBefore(currentTime, "hour")) {
        eventEl.addClass("past");
    } else if (moment(timeblockTime).isSame(currentTime, "hour")) {
        eventEl.addClass("present");
    } else {
        eventEl.addClass("future");
    }
}

// parameters indicates business hours' start time and end time
createTimeblocks(9, 17);

