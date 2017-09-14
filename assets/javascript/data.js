$("#tripInfo").hide();
  var startStationName = "";
				var startStationNum = "";
				var destinationStationName = "";
				var destinationStationNum = "";
                var searchStationName = "";
                var searchDStationName = "";
                var startingStation;
                var endingStation;
                var currTime;
                var arrivingTrains=[];
                var list = [];
                var dlist = [];
                var loop = 1;
                var keydata = []; 
                var destInfo = '';
                var key = '';
                var estArrivalTime;

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

  var database = firebase.database();

      // Collecting data from input form and uploading to database
$("#submit").on("click", function(event) {
      event.preventDefault();
                // extract values from input fields
			

			// function get data	

				startStationName = $("#startingStation option:selected").text().trim();
				startStationNum = parseInt($("#startingStation option:selected").val().trim());
				destinationStationName = $("#endingStation option:selected").text().trim();
				destinationStationNum = parseInt($("#endingStation option:selected").val().trim());
				estArrivalTime = $("#estartingStationtartTime option:selected").val();


				console.log("****************** "+ estArrivalTime + "*****************");
                // Get current Time from desktop 

                if (estArrivalTime == "selectStart") {
		                var n = (new Date()).getHours();
					
		                if (n < 12) {
					
						currTime = moment($.now()).format("H:mm:ss").trim();
					} else {
						
						currTime = moment($.now()).format("HH:mm:ss").trim();
						}
				}else{
					currTime = estArrivalTime;
				}

				// console.log("Start station = " + startStationName);
				// console.log("start station num = " + startStationNum);
				// console.log("end  station = " + destinationStationName );
				// console.log("end station num  = " + destinationStationNum);

				// review with html table setup
				$("#sStation").text(startStationName);
				$("#dStation").text(destinationStationName);
				$("#tripInfo").show();
                //
				startingStation = getsearchkey(startStationNum);
				console.log(" start train station search = " + startingStation);

				endingStation = getsearchkey(destinationStationNum);
				console.log(" destination train station search = " + endingStation);

				if (startStationNum > destinationStationNum) {
					console.log(" train is going south");
						getSBSchedInfo();
						setTimeout(runSBInfoloop, 3000);
                    //    dlistArray();
				
				} else if ( startStationNum < destinationStationNum) {
					console.log(" Train is going north");
					getNBSchedInfo();
					setTimeout(runNBInfoloop, 3000);
				//	dlistArray();
					
				} else {
					// console.log("You are at your Destination");
				}


   //==========================================================================================
setTimeout(listArray, 4000);

 }); //end of on click

//==============================functions below ================================

//==============================North Bound Train Info================================

function getNBSchedInfo(){
var NBSched = database.ref('NBSched/Stations/'+ startingStation + '/schedTrains');

// Attach an asynchronous callback to read the data at our posts reference
NBSched.on("child_added", function(nbsnap , pnbsnapkey) {
  console.log("snapNB = " + nbsnap.val() +" < > " + " Time + " + currTime);
 //startAt current time doesn't work due to file type. hack the desired outcome
if ( moment(nbsnap.val().trim(),"HH:mm:ss") > moment(currTime.trim(),"HH:mm:ss") ) {
			 console.log("Key = " +nbsnap.key +" > "+ " = " + currTime + " >>> " + nbsnap.val() );
		    if (loop <= 3 ) {  
		     keydata.push(nbsnap.key); 
		     list.push(nbsnap.val());
		  
		     loop++;
		  // console.log("currTime : " + currTime + " <=>  "+ "nbsnap value = " +nbsnap.val()),
		  console.log("currTime Type : " + typeof(currTime) + " <=>  Snap Type "+ typeof(nbsnap.val()) );
		
		 console.log(" key type = "+ typeof(nbsnap.key));
		} else {

          // load array list into window 
		 }
} else { }
 
 
});

}

//==========================South Bound Train Info =========================================================

function getSBSchedInfo(){
var SBSched = database.ref('SBSched/stations/'+ startingStation + '/schedTrains');

// Attach an asynchronous callback to read the data at our posts reference
SBSched.on("child_added", function(sbsnap , psbsnapkey) {
  
 //startAt current time doesn't work due to file type. hack the desired outcome
if ( moment(sbsnap.val().trim(),"HH:mm:ss") > moment(currTime.trim(),"HH:mm:ss") ) {
			 console.log("Key = " +sbsnap.key + " = " + sbsnap.val() );
		    if (loop <= 3 ) {  
		     keydata.push(sbsnap.key); 
		     list.push(sbsnap.val());
		 
		   loop++;
		  // console.log("currTime : " + currTime + " <=>  "+ "nbsnap value = " +nbsnap.val()),
		  // console.log("currTime Type : " + typeof(currTime) + " <=>  Snap Type "+ typeof(nbsnap.val()) );
		
		} else {

          // load array list into window 
		 }
} else { }
 
 
});

}
//================================North bound Loop==============


function runNBInfoloop() {
   
 console.log("running runNBInfoloop");
 console.log(keydata);
	for (i = 0; i <=2; i++) { 
		key = keydata[i];
		console.log("loop cnt = "+ i);
		console.log(" array item : " + keydata[i]);
		console.log("data key = " + key);
        getNBDestInfo(key);


 	
     

	} 
}

//================================North bound Loop==============


function runSBInfoloop() {
   
    // console.log("running runSBInfoloop");
 console.log(keydata);
	for (i = 0; i <=2; i++) { 
		key = keydata[i];
		console.log("loop cnt = "+ i);
		console.log(" array item : " + keydata[i]);
		console.log("data key = " + key);
		console.log("new key value = " + key);
        getSBDestInfo(key);


 	
   

	} 
}

//================================North bound Destination data==========================================
function getNBDestInfo(key){
	console.log("running getNBDestInfo");
		var NBDest = database.ref('NBTrainSeq/trainSchedSeq/'+ key);

		// Attach an asynchronous callback to read the data at our posts reference
		NBDest.on("child_added", function(nbdsnap , pnbdsnapkey) {
		  
		 //startAt current time doesn't work due to file type. hack the desired outcome
				
				

			//	console.log("Previous Key = " +  pnbdsnapkey );
				


		 		if ( nbdsnap.key == endingStation){

		 			//destInfo = nbdsnap.val();
		 			console.log("found data for output" );
		 			console.log(typeof(nbdsnap.key) + " : " + nbdsnap.key + "<>" + endingStation  + " : " + typeof(endingStation) );
		 			console.log("Current Key = " +  nbdsnap.key);
				    console.log("Data Time = " +  nbdsnap.val() );
		 			 
		 		 dlist.push(nbdsnap.val());
		 		 console.log( dlist);
		 		}
		 		else {};
	 
		});
		 
      setTimeout(dlistArray, 4000);
}


//================================South bound Destination data ==========================================
function getSBDestInfo(key){
	console.log("running getSBDestInfo");
		var SBDest = database.ref('SBTrainSeq/trainSchedSeq/'+ key);

		// Attach an asynchronous callback to read the data at our posts reference
		SBDest.on("child_added", function(sbdsnap , psbdsnapkey) {
		  
		 //startAt current time doesn't work due to file type. hack the desired outcome

			//	console.log("Previous Key = " +  snbdsnapkey );
	
		 		if ( sbdsnap.key == endingStation){

		 			//destInfo = nbdsnap.val();
		 			console.log("found data for output" );
		 			console.log(typeof(sbdsnap.key) + " : " + sbdsnap.key + "<>" + endingStation  + " : " + typeof(endingStation) );
		 			console.log("Current Key = " +  sbdsnap.key);
				    console.log("Data Time = " +  sbdsnap.val() );
		 			 
		 		 dlist.push(sbdsnap.val());
		 		 console.log( dlist);
		 		}
		 		else {};
		 
		});
		  
      setTimeout(dlistArray, 4000);
}




//=====================================================================================
	  function listArray() {
	 console.log("List keys = "+ keydata);
	 console.log("List Array = "+ list);
	 $("#sTrain1").text(list[0]);
	 $("#sTrain2").text(list[1]);
	 $("#sTrain3").text(list[2]);
      
	}

	 function dlistArray() {
	console.log("running dlistArray");
	 console.log("dList Array = "+ dlist);
	 $("#dTrain1").text(dlist[0]);
	 $("#dTrain2").text(dlist[1]);
	 $("#dTrain3").text(dlist[2]);
	}

   function getsearchkey(station) {
   				// console.log("getsearchkey = " + station);
				var stationName;
			//	station = parseInt(station);
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