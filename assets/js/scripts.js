// GlOBABL VARIABLES //
var timeblocksUl = document.getElementById("timeblocks");
var timeblocksContainerEl = document.querySelector("#timeblocksContainer");
var duration = moment.duration({'hours' : 1});
var eventsAr = [];



var hoursAr = ["8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm"];



$("#currentDay").text(moment().format('LL'));

 
// FUNCTIONS //
// create the timeblocks
var hoursDisplay = function() {
  timeIdAm = 8;
  timeIdPm = 1;
  var timeText = moment().set("hour", 7).set("minute",0).set("second", 0);

  // create container for timeblocks
  //loop through array to create timeblocks
  for (var i = 0; i < hoursAr.length; i++) {
    // create li element for each timeblock
    var hoursLi = document.createElement("li");
    hoursLi.classList = ("card mb-3");
    
    //create header with hour for each li
    var hourHeader = document.createElement("div");
    hourHeader.classList = "card-header text-white bg-dark";
    hourHeader.textContent = timeText.add(duration).format("LT");
    var saveBtn = document.createElement("button");
    saveBtn.classList = "btn btn-info "
    saveBtn.textContent = "save";
    saveBtn.id = "save-button";
    hoursLi.appendChild(saveBtn);
    // append header to li
    hoursLi.appendChild(hourHeader);


    // assign exclusive id's based on time
    if (i <= 3) {
      hoursLi.id = timeIdAm++ + "am"
    } else if (i === 4) {
      hoursLi.id = "12pm";
    } else if (i >= 5) {
      hoursLi.id = timeIdPm++ + "pm";
    }

    //append li to ul
    timeblocksUl.appendChild(hoursLi);

    //send to audit
    auditTimeblocks(hoursLi);
  }
  document.getElementById("save-button").addEventListener("click", function(){
    var id = $(this).parent().attr("id");
    localStorage.setItem("events", JSON.stringify(eventsAr));
  })
}


var createEvent = function () {
  $("div.card-header").on('click', function() {;
    var eventName = prompt("Event Name: ")
    var id = $(this).parent().attr("id");
    var event = document.getElementById(id);
    var eventText = document.createElement("h1");
    eventText.id = "event-text"
    eventText.classList = ("text-dark")
    eventText.textContent = eventName;
    event.appendChild(eventText);
    eventsAr.push(eventText.textContent);
  });
}

var loadSavedEvents = function(x) {
  var eventText = document.createElement("h1");
  eventText.textContent = x;
  eventText.classList = "text-dark";
  document.getElementById("8am").appendChild(eventText);
}


// Load function
var load = function() {
  var loadedEvents = JSON.parse(localStorage.getItem("events"));
  if (!loadedEvents) {
    return;
  } else {
    for (i = 0; i < loadedEvents.length; i++) {
      loadSavedEvents(loadedEvents[i]);
    }
  }
}



// audit Timeblocks to color code based on past present or future
var auditTimeblocks = function(hoursEl) {
  var liTime = $(hoursEl).find("div").text().trim();
  var liHour = moment(liTime, "LT");

  // appply new class based on time
  if (moment().isSame(liHour, "hour")) {
    $(hoursEl).addClass("present");
  } else if (moment().isAfter(liHour)) {
      $(hoursEl).addClass("past")
  }  else if (moment().isBefore(liHour)) {
    $(hoursEl).addClass("future")
  }

}


// EVENT HANDLES //



// EVENT LISTENERS //



// CALLS //
hoursDisplay();
load();
createEvent();
loadSavedEvents();