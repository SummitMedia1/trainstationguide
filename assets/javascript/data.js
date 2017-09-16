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
                var list = [];
                var dlist = [];
                var dTName = [];
                var loop = 1;
                var keydata = []; 
                var destInfo = '';
                var key = '';
                var estArrivalTime;
                var alarmTime;

                $("#success").hide();
	 			$("#timeUpInOneMinute").hide();
	 			$("#fail").hide();
	 			$("#noStation").hide();
	 			$("#stationNotFound").hide();

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

      // Collecting data from input form 

$("#submit").on("click", function(event) {
      event.preventDefault();
                // clear out the variables and arrays for repeat processsing.
			    runInitVariables();
                // get input form options
			    getSelectedInput();
			    // get train time based on user input or current clock
			    selectCurrTime(); 
			    //update choice of starting and destination stations
                updateScreen();
                // deternime travel direction
				chooseTravelDirecion();

				// update train starting and ending times 
				//set timer 4 secs to allow firebase data feed to complete before updating array 
				// setTimeout(listArray, 2000);
				setTimeout(dlistArray, 4000);
 }); //end of on click

//-----------------Alarm Function Button ------------------------------------------------------------
$("#widget2").on("click", function(event) {
      $("#arrival-audio").get(0).play();

});




//==============================functions below ================================
//==========================Initialize Variables================================
 function runInitVariables() {

				$("#tripInfo").hide();
				startStationName = "";
				startStationNum = "";
				destinationStationName = "";
				destinationStationNum = "";
                searchStationName = "";
                searchDStationName = "";
                startingStation;
                endingStation;
                currTime;
                list = [];
                dlist = [];
                dTName = [];
                loop = 1;
                keydata = []; 
                destInfo = '';
                key = '';
                currTime = "";
                estArrivalTime ="";
                alarmTime = "";
                $("#sTrain1").text("");
	 			$("#sTrain2").text("");
	 			$("#sTrain3").text("");
	 			$("#dTrain1").text("");
	 			$("#dTrain2").text("");
	 			$("#dTrain3").text("");
	 			$("#Train1").text("");
	 			$("#Train2").text("");
	 			$("#Train3").text("");
			}
//========================================= function get data =================================================
function  getSelectedInput() {

				startStationName       = $("#startingStation option:selected").text().trim();
				startStationNum        = parseInt($("#startingStation option:selected").val().trim());
				destinationStationName = $("#endingStation option:selected").text().trim();
				destinationStationNum  = parseInt($("#endingStation option:selected").val().trim());
				estArrivalTime         = $("#estartingStationtartTime option:selected").val();

			}
//========================================= function get currTime =================================================
function  selectCurrTime(){

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
              }
//==============================North Bound Train Info================================

function getNBSchedInfo(){
	var NBSched = database.ref('NBSched/Stations/'+ startingStation + '/schedTrains');

	// Attach an asynchronous callback to read the data at our posts reference
	NBSched.on("child_added", function(nbsnap , pnbsnapkey) {
	  // console.log("snapNB = " + nbsnap.val() +" < > " + " Time + " + currTime);
	 //startAt current time doesn't work due to file type. hack the desired outcome
	if ( moment(nbsnap.val().trim(),"HH:mm:ss") > moment(currTime.trim(),"HH:mm:ss") ) {
			 // console.log("Key = " +nbsnap.key +" > "+ " = " + currTime + " >>> " + nbsnap.val() );
		    if (loop <= 3 ) {  
		     keydata.push(nbsnap.key); 
		     list.push(nbsnap.val());
		  
		     loop++;
			  // console.log("currTime : " + currTime + " <=>  "+ "nbsnap value = " +nbsnap.val()),
			  // console.log("currTime Type : " + typeof(currTime) + " <=>  Snap Type "+ typeof(nbsnap.val()) );
			 // console.log(" key type = "+ typeof(nbsnap.key));
			} else {}
		} else { }
 
	});
}

//==========================South Bound Train Info =========================================================

function getSBSchedInfo(){
var SBSched = database.ref('SBSched/stations/'+ startingStation + '/schedTrains');

// Attach an asynchronous callback to read the data at our posts reference
SBSched.on("child_added", function(sbsnap , psbsnapkey) {
  
 //startAt current time doesn't work due to file type(number string). hack the desired outcome
		if ( moment(sbsnap.val().trim(),"HH:mm:ss") > moment(currTime.trim(),"HH:mm:ss") ) {
					 // console.log("Key = " +sbsnap.key + " = " + sbsnap.val() );
				    if (loop <= 3 ) {  
				     keydata.push(sbsnap.key); 
				     list.push(sbsnap.val());
				   loop++;
				} else {}
		} else { }
	});
}
//================================North bound Loop==============


function runNBInfoloop() {
   
 // console.log("running runNBInfoloop");
 if (keydata.length != 0) {
	for (i = 0; i <= keydata.length; i++) { 
		key = keydata[i];
        getNBDestInfo(key);
	} 
	// setTimeout(dlistArray, 4000);
  } else {
  	console.log(" No train schedule info available");
  }
}	


//================================North bound Loop==============


function runSBInfoloop() {
   
    // console.log("running runSBInfoloop");
 if (keydata.length != 0) {
	for (i = 0; i <= keydata.length; i++) { 
		key = keydata[i];
	//	console.log("new key value = " + key);
        getSBDestInfo(key);
	} 
	// setTimeout(dlistArray, 4000);
  } else {
  	console.log(" No train schedule info available");
  }
}

//================================North bound Destination data==========================================
function getNBDestInfo(key){
	// console.log("running getNBDestInfo");
		var NBDest = database.ref('NBTrainSeq/trainSchedSeq/'+ key);

		// Attach an asynchronous callback to read the data at our posts reference
		NBDest.on("child_added", function(nbdsnap , pnbdsnapkey) {
		
		 //startAt current time doesn't work due to file type. hack the desired outcome

		 		if ( nbdsnap.key == endingStation){
			 		 dlist.push(nbdsnap.val());
			 		}
			 		else {};

		 		if ( nbdsnap.val() == "D"){
		 		 dTName.push(nbdsnap.val());
		 		 // console.log(dTName);
		 		}
		 		else if (nbdsnap.val() == "C"){
		 		 dTName.push(nbdsnap.val());	
		 		 // console.log(dTName);
		 		} else {};
		});
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
		 		  dlist.push(sbdsnap.val());
		 		}
		 		else {};
		 		if ( sbdsnap.val() == "D"){
		 		 dTName.push(sbdsnap.val());
		 		}
		 		else if (sbdsnap.val() == "C"){
		 		 dTName.push(sbdsnap.val());	
		 		} else {};
		 
		});
}

//========================function dlistArray===============================================
	
   function dlistArray() {
                // console.log("running dlistArray");
                //  console.log("dList Array = "+ dlist);

                // Load data into destination station ans trail line
                if (list.length > 0){
    	for (i = 0; i <= list.length; i++) { 
    	
	           if (i == 0){
	           		 $("#sTrain1").text(list[0].slice(0, -3));
	           	}
	           else if (i == 1) {
	           		$("#sTrain2").text(list[1].slice(0, -3));
	           	}
	           		else if (i == 2) {
	           		$("#sTrain3").text(list[2].slice(0, -3)); 
	           	}
         } //end of for i loop 

                console.log( "dlist length - " + dlist.length) ; 
                console.log ("list length - " + list.length) ;
                if (list.length === dlist.length) { 
                        for (j = 0; j <= dlist.length; j++) { 
                        
                               if (j == 0){ 
                                       $("#Train1").text(dTName[0] + " Line");
                                    $("#dTrain1").text(dlist[0].slice(0, -3)); 
                               }
                               else if (j == 1) {
                                       $("#Train2").text(dTName[1] + " Line");
                                    $("#dTrain2").text(dlist[1].slice(0, -3)); 
                               }
                               else if (j == 2) {
                                        $("#Train3").text(dTName[2] + " Line"); 
                                       $("#dTrain3").text(dlist[2].slice(0, -3));
                               } else{}
                               setAlarm();  
                          } //end of for loop  

                    }else {
                    	$("#sTrain1").text("");
	 					$("#sTrain2").text("");
	 					$("#sTrain3").text("");
                         $("#stationNotFound").fadeIn(1000).delay(5000).fadeOut(1000);

                         $("#map").slideUp(1000).delay(5000).slideDown(1000);
                         window.setTimeout(function(){location.reload()},6000);
                         console.log(" There are no trains going to the destination selected ")
                        } // end if check for array data                    
            } // end of function

//============function list Array=======================================
	  function listArray() {
	 // console.log("List keys = "+ keydata);
	 // console.log("List Array = "+ list);
	 console.log("list.length = " + list.length);
    // if (list.length > 0){
    // 	for (i = 0; i <= list.length; i++) { 
    	
	   //         if (i == 0){
	   //         		 $("#sTrain1").text(list[0].slice(0, -3));
	   //         	}
	   //         else if (i == 1) {
	   //         		$("#sTrain2").text(list[1].slice(0, -3));
	   //         	}
	   //         		else if (i == 2) {
	   //         		$("#sTrain3").text(list[2].slice(0, -3)); 
	   //         	}
    //      } //end of for i loop  		     
    
	}//============= endof if check for array data (length) =====
} //================ end of function listArray ================


//==================srt Alarm function=================================================

function setAlarm() { 
	   alarmTime = moment(dlist[0],"HH:mm:ss");
	   alarmTime = moment(dlist[0],"HH:mm:ss").subtract(1, "minutes");	
	   alarmTime = moment(alarmTime).format("HH:mm:ss");	
	   console.log("alarmTime after :" + alarmTime);
	  checkAlarm();
} // end of function setAlarm	  
//====================================================

function checkAlarm(){
	 intervalId = setInterval(compareTimes, 1000);
	 console.log("Running Interval");
}			  
//====================compareTimes Function==================================
    function compareTimes() {
     		// console.log("alarmTime =" + alarmTime + " < > currTime =" + moment($.now()).format("H:mm:ss"));
	    	  if (alarmTime == moment($.now()).format("HH:mm:ss"))  {
	      			console.log("alarmTime =" + alarmTime + " < > currTime =" + moment($.now()).format("H:mm:ss"));
	  			 //==== stop alarm timer ===========  
	       		 	clearInterval(intervalId);
	   			//======= activate alarm function goes below ===================
					$("#arrival-audio").get(0).play();
	       			$("#timeUpInOneMinute").fadeIn(1000).delay(8000).fadeOut(1000);
			 } else{}
	
} //end of function	

//===========================function getsearchkey==========================================
 function updateScreen(){
				// enter  starting and destination stations to html
				$("#sStation").text(startStationName);
				$("#dStation").text(destinationStationName);
				$("#tripInfo").show();
			 }

//=========================================================================================
function chooseTravelDirecion(){
				startingStation = getsearchkey(startStationNum);
				// console.log(" start train station search = " + startingStation);
				endingStation = getsearchkey(destinationStationNum);
				// console.log(" destination train station search = " + endingStation);
				if (startStationNum > destinationStationNum) {
					// console.log(" train is going south");
						getSBSchedInfo();
						setTimeout(runSBInfoloop, 3000);
				} else if ( startStationNum < destinationStationNum) {
					// console.log(" Train is going north");
					getNBSchedInfo();
					setTimeout(runNBInfoloop, 3000);
				} else {
					//alert("You are already at your Destination");
					$("#map").slideUp(1000).delay(5000).slideDown(1000);
					$("#fail").fadeIn(1000).delay(5000).fadeOut(1000);
				}
       }

//===========================function getsearchkey==========================================
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
                                break;
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
                            $("#noStation").fadeIn(1000).delay(000).fadeOut(1000);
                            break;
                }
				// console.log("returning " + stationName);
             return stationName;
}