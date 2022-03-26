// define business hours
var start = 9;
var end = 17;

// events array to store date, time, and events
var events = [];

// show current day and date in the header
$("#currentDay").text(moment().format("dddd, MMMM Do"));
var dateFormat = "YYYY-M-D H:mm";
var today = moment().format("YYYY-MM-DD");

// create timeblocks
var createTimeblocks = function(start, end) {
    // get saved events from local storage
    var savedEvents = JSON.parse(localStorage.getItem("events"));
    var counter = 0;

    // create each timeblocks element until it reaches end time
    for (var i = start; i < (end + 1); i++) {
        // define time for the time block
        var time = i + ":00";
        var timeVal = moment(today + " " + time, dateFormat).format("hA");

        // create a container
        var timeBlockEl = $("<div>")
            .addClass("block-container row");

        // create each element
        var timeEl = $("<time>")
            .addClass("hour col-2 col-md-1 px-1 py-3")
            .attr("datetime", i)
            .text(timeVal);
        var eventEl = $("<p>")
            .addClass("description col-8 col-md-10 p-2")
            .attr("id", "event");
        var saveBtn = $("<button>")
            .addClass("saveBtn col-2 col-md-1");
        var iconEl = $("<i>")
            .addClass("ri-save-2-fill");
        saveBtn.append(iconEl);

        // check current time and indicate state with color
        checkCurrentTime(i, eventEl);

        // append all elements to the container
        timeBlockEl.append(timeEl, eventEl, saveBtn);
        $("#timeblocks-container").append(timeBlockEl);

        // get element's content to store in events array
        var dateEl = $("#currentDay").text().trim();
        timeEl = $(".hour[datetime$='" + i + "']");
        eventEl = timeEl.parent().find("p");

        // if saved events in local storage,
        if (savedEvents) {
            // and if the date of local storage is the same as the date shown in the header, replace the text of event element
            if (dateEl === savedEvents[counter].date) {
                eventEl.text(savedEvents[counter].event);
            }
        }

        // store current data in events array
        events.push({
            date: dateEl,
            time: timeVal,
            event: eventEl.text().trim()
        });

        counter += 1;
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
    // define event element to replace
    var text = $(this)
        .val();    
    var eventEl = $("<p>")
        .addClass("description col-8 col-md-10 p-2")
        .attr("id", "event")
        .text(text);
    var time = $(this).parent().find(".hour").attr("datetime");
    
    // check current time and re-indicate state with color
    checkCurrentTime(time, eventEl);
    // replace textarea with p element
    $(this).replaceWith(eventEl);
});

var checkCurrentTime = function(time, eventEl) {
    // get current time
    var currentTime = moment().format("YYYY-MM-DD kk:mm");
    var timeblockTime = moment(today + " " + time, dateFormat).format("YYYY-MM-DD kk:mm");

    // remove class defining state
    eventEl.removeClass("past present future");
    
    // add class to indicate state with color
    if (moment(timeblockTime).isBefore(currentTime, "hour")) {
        eventEl.addClass("past");
    } else if (moment(timeblockTime).isSame(currentTime, "hour")) {
        eventEl.addClass("present");
    } else if (moment(timeblockTime).isAfter(currentTime, "hour")) {
        eventEl.addClass("future");
    }
}

$("#timeblocks-container").on("click", "button", function() {
    // define each data to store in an array
    var dateEl = $("#currentDay").text().trim();
    var timeEl = $(this).parent().find(".hour").text().trim();
    var eventEl = $(this).parent().find("#event").text().trim();
    // temporary array to store and save data
    var tempArr = [];
    
    // store data in a temporary array until the end of events array
    for (var i = 0; i < events.length; i++) {
        // if the time element data meets the time in events array, push new data to the array
        if (timeEl === events[i].time) {
            tempArr.push({
                date: dateEl,
                time: timeEl,
                event: eventEl
            });
        // if not, push the currently stored data
        } else {
            tempArr.push({
                date: events[i].date,
                time: events[i].time,
                event: events[i].event
            });
        }
    }

    // store temporary array to the events array and save it in local storage
    events = tempArr;
    localStorage.setItem("events", JSON.stringify(events));
});

// parameters indicates business hours' start time and end time (defined at the top of this file)
createTimeblocks(start, end);

// check current time every 30 minutes to refresh the state
setInterval(function() {
    $(".description").each(function(index) {
        var time = index + start;
        var eventEl = $(".hour[datetime$='" + time + "']").parent().find("p");

        checkCurrentTime(time, eventEl);
    })
}, (1000 * 60) * 30);
