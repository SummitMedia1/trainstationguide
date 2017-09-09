// clock variables
var clockTime = null;
var clockDate = moment().format("MMM Do, YYYY");
var hour;

function clockWidgetStart() {
	clockSet();
	setInterval(clockSet, 1000);

	// comment this line out to prevent excess ajax calls
	// weatherSet();
}

function clockSet() {
	clockTime = moment().format("h:mm:ss a");
	$("#clock-time").html("<p>" + clockTime + "</p>");
	$("#clock-date").html("<p>" + clockDate + "</p>");
	hour = moment().format("HH");
	if (hour > 18) {
		weatherDayNight = "night";
	} else if (hour < 6) {
		weatherDayNight = "night";
	} else {
		weatherDayNight = "day";
	}
}

function weatherSet() {
	var weatherCity = "Denver";
	var weatherURL = "http://api.wunderground.com/api/ddf5a7c71b542ac1/hourly/q/CO/Denver.json";
	$.ajax({
		url: weatherURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		weatherWrite(response);
	});
}

function weatherWrite(x) {
	$("#weather-holder").html(x.hourly_forecast[0].condition + " - " + x.hourly_forecast[0].feelslike.english + "°");
	$("#weather-icon").attr("src", x.hourly_forecast[0].icon_url);
	if (x.hourly_forecast[0].feelslike.english > 80) {
		$("#weather-recommended").html("Good " + weatherDayNight + " for shorts!");
	} else if (x.hourly_forecast[0].feelslike.english < 50) {
		$("#weather-recommended").html("Bring a jacket!");
	} else {
		$("#weather-recommended").html("Pretty mild out.");
	}
}

$(document).ready(function() {
	clockWidgetStart();
});