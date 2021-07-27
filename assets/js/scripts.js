// GlOBABL VARIABLES //
var timeId = moment().set("hour", 7).set("minute",0).set("second", 0);
var duration = moment.duration({'hours' : 1});
var timeblocksContainerEl = document.querySelector("#timeblocksContainer");


var hoursAr = ["8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm"];



$("#currentDay").text(moment().format('LL'));

 
// FUNCTIONS //
// create the timeblocks
var hoursDisplay = function() {
    var hoursUl = document.createElement("ul");
    
    
    for (var i = 0; i < hoursAr.length; i++) {
        var hoursLi = document.createElement("li");
        hoursLi.classList = ("card mb-3");
        var hour = document.createElement("div");
        hour.classList = "card-header  text-white bg-dark";
        hour.textContent = timeId.add(duration).format("LT");
        hoursLi.appendChild(hour);
        var hoursEvent = document.createElement("div");
        hoursEvent.classList = "card-body bg-light";
        hoursLi.appendChild(hoursEvent);
        hoursUl.appendChild(hoursLi);
        auditTimeblocks(hoursLi);

    }
    timeblocksContainerEl.appendChild(hoursUl);

}

var auditTimeblocks = function(hoursEl) {
    var liTime = $(hoursEl).find("div").text().trim();
    var liHour = moment(liTime, "LT");
    var currentTime = moment().set("minutes", 0).format("LT");

  // appply new class if task is near/over due date
  if (moment().isSame(liHour, "hour")) {
    $(hoursEl).addClass("list-group-item-success");
  } else if (moment().isAfter(liHour)) {
      $(hoursEl).addClass("list-group-item-danger")
  }  else if (moment().isBefore(liHour)) {
    $(hoursEl).addClass("list-group-item-primary")
}
    // appply new class if task is near/over due date

}








// EVENT HANDLES //



// EVENT LISTENERS //



// CALLS //
hoursDisplay();