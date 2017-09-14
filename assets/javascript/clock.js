// clock variables
var clockTime = null;
var clockDate = moment().format("MMM Do, YYYY");
var hour;
var weatherDayNight;

function clockWidgetStart() {
	clockSet();
	setInterval(clockSet, 1000);
	weatherSet();
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
	var APIKey = "62cb8cf1fb24944a942c172397d1b3ce";
	var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Denver&appid=" + APIKey;
	$.ajax({
		url: weatherURL,
		method: "GET"
	}).done(function(response) {
		weatherWrite(response);
	});
}

function weatherWrite(x) {
	var weatherIcon = x.weather[0].icon.replace(/.$/,"d") + ".png";
	var temp = Math.floor(1.8 * (x.main.temp - 273) + 32);
	var conditions = x.weather[0].description.charAt(0).toUpperCase() + x.weather[0].description.slice(1);

	$("#weather-holder").html(conditions + " " + temp + "°");
	$("#weather-icon").attr("src", "http://openweathermap.org/img/w/" + weatherIcon);
	if (temp > 80) {
		$("#weather-recommended").html("Good " + weatherDayNight + " for shorts!");
	} else if (temp < 50) {
		$("#weather-recommended").html("Bring a jacket!");
	} else {
		$("#weather-recommended").html("Pretty nice out.");
	}
}

$(document).ready(function() {
	clockWidgetStart();
});