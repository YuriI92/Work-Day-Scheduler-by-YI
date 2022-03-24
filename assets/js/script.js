// var workStart = 9;  // start time
// var workEnd = 17;  // end time

// show current day and date in the header
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// create timeblocks
var createTimeblocks = function(start, end) {
    var timeblocks = $("<div>").addClass("row");

    for (var i = start; i < (end + 1); i++) {
        var timeBlockEl = $("<div>")
            .addClass("hour col-2 col-md-1 py-2")
            .text(moment(start, "HH").format("HA"));
        var eventBlockEl = $("<p>")
            .addClass("description col-8 col-md-10 p-1");
        var saveBtn = $("<button>")
            .addClass("saveBtn col-2 col-md-1");
        
        timeblocks.append(timeBlockEl, eventBlockEl, saveBtn);
        
        start += 1;
    }

    $("#timeblocks-container").append(timeblocks);
}

createTimeblocks(9, 17);