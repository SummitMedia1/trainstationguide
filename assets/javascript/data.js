// Initialize Firebase
  var config = {
    apiKey: "AIzaSyApMjP60_nJEgRBvEzlWZc1qdhsvYz8TEw",
    authDomain: "train-schedule-4e958.firebaseapp.com",
    databaseURL: "https://train-schedule-4e958.firebaseio.com",
    projectId: "train-schedule-4e958",
    storageBucket: "train-schedule-4e958.appspot.com",
    messagingSenderId: "977091576988"
  };
  firebase.initializeApp(config);
  $("#tripInfo").hide();

  var database = firebase.database();
      // Collecting data from input form and uploading to database
$("#submit").on("click", function(event) {
      event.preventDefault();
                // extract values from input fields
				var startStationName = "";
				var startStationNum = "";
				var destinationStationName = "";
				var destinationStationNum = "";
                var searchStationName = "";
                var searchDStationName = "";
                

				startStationName = $("#startingStation option:selected").text().trim();
				startStationNum = $("#startingStation option:selected").val().trim();
				destinationStationName = $("#endingStation option:selected").text().trim();
				destinationStationNum = $("#endingStation option:selected").val().trim();
				//destinationStationNum = $("#estStartTime").val().trim();
				// fTTime = moment($("#firstTrainTime-input").val().trim(), "HH:mm").format("HH:mm");

				console.log("Start text = " + startStationName);
				console.log("start val = " + startStationNum);
				console.log("end  text = " + destinationStationName );
				console.log("end val = " + destinationStationNum);

				// review with html table setup
				$("#sStation").text(startStationName);
				$("#dStation").text(destinationStationName);
				$("#tripInfo").fadeIn(1500).show();

				if (startStationNum > destinationStationNum) {
					console.log(" train is going south");

				var aaa = getsearchkey(destinationStationNum);
				console.log(" train station = " + aaa);
				} else if ( startStationNum < destinationStationNum) {
					console.log(" Train is going north");
					var bbb = getsearchkey(destinationStationNum);
				console.log(" train station = " + bbb);
				} else {
					console.log("You are at your Destination");
				}
 }); 
  
   function getsearchkey(station) {
   				console.log("getsearchkey = " + station);
				var stationName;
				station = parseInt(station);
				switch (station) {
						    case 0:
						        stationName = "LittletonMineral";
						        break;
						    case 1:
						        stationName = "LittletonDowntown";
						        break;
						    case 2:
						        stationName = "Oxford";
						        break;
						    case 3:
						       stationName = "Englewood";
						        break;
						    case 4:
						        stationName = "Evans";
						        break;
						    case 5:
						        stationName = "ITwentyFiveBroadway";
						        break;
						    case 6:
						        stationName = "Alameda";
						    case 7:
						        stationName = "tenthOsage";
						        break;
						    case 8:
						        stationName = "AurariaWest";
						        break;
						    case 9:
						        stationName = "SportsAuthorityField";
						        break;
						    case 10:
						        stationName = "PepsiCenter";
						    case 11:
						        stationName = "UnionStation";
						        break;
						    case 12:
						        stationName = "ColfaxAtAuraria";
						        break;
						    case 13:
						        stationName = "ConventionCenter";
						        break;
						    case 14:
						        stationName = "sixteenthCalifornia";
						    case 15:
						       stationName = "eighteenthCalifornia";
						        break;
						    case 16:
						        stationName = "twentythWelton";
						        break;
						    case 17:
						        stationName = "twentyfifthWelton";
						        break;
						    case 18:
						        stationName = "twentyseventhWelton";
						    case 19:
						       stationName = "thirtythDowning";
						        break;
					        default: 
					        alert(" Train Station is not found");
					        break;
				}
				console.log("returning " + stationName);
             return stationName;

			
          
  }
   
     

       tFrequency =  $("#tFrequency-input").val().trim();
      // Creates local "temporary" object for holding employee data
      newtrain = {
        tname: trainName,
        tDest: tDestination,
        fTime: fTTime,
        tFreq: tFrequency
      };


/*
$(document).ready(function(){
    $("form").submit(function(){
        alert("Submitted");
    });
});




*/