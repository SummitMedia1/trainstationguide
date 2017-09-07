function initMap() {
            var infoWindow;
            var start;
            // var contentString = '<div id="content">'+ "<a href='http://maps.google.com/?saddr=Your+location&daddr=Littleton+Mineral+Station,CO'>Click here</a>" + '</div>'; 
            var contentString;
            var options = {
                zoom: 12,
                center: {
                    lat: 39.5800,
                    lng: -105.0251
                }
            };

            var map = new google.maps.Map(document.getElementById("map"), options);

            var markers = [{
                    //Mineral
                    coords: {
                        lat: 39.5800,
                        lng: -105.0251
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Littleton+Mineral+Station,CO'>Click here</a>" + '</div>'
                },
                {
                    //Littleton Downtown Station
                    coords: {
                        lat: 39.6120,
                        lng: -105.0149
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Littleton+Downtown+Station,CO'>Click here</a>" + '</div>'
                },
                {
                    //Oxford+City+of+Sheridan+Station,CO
                    coords: {
                        lat: 39.6429,
                        lng: -105.0048
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Oxford+City+of+Sheridan+Station,CO'>Click here</a>" + '</div>'
                },
                {
                    //Englewood Station
                    coords: {
                        lat: 39.6556,
                        lng: -104.9999
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Englewood+Station,CO'>Click here</a>" + '</div>'
                },
                {
                    //Evans+lightrail+Station,Denver+CO
                    coords: {
                        lat: 39.6778,
                        lng: -104.9927
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Evans+lightrail+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //I-25+Broadway+Station,Denver+CO
                    coords: {
                        lat: 39.7015,
                        lng: -104.9900
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=I-25+Broadway+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Alameda+Station,Denver+CO
                    coords: {
                        lat: 39.7086,
                        lng: -104.9927
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Alameda+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //10th & Osage Station
                    coords: {
                        lat: 39.7319,
                        lng: -105.0056
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=10th+Osage+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Auraria West
                    coords: {
                        lat: 39.7416,
                        lng: -105.0109
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Auraria+West+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Sports Authority Field at Mile High Station
                    coords: {
                        lat: 39.7434,
                        lng: -105.0131
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Sports+Authority+Field+at+Mile+High+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Pepsi Center - Elitch Gardens Station
                    coords: {
                        lat: 39.7488,
                        lng: -105.0094
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Pepsi+Center-Elitch+Gardens+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Union Station
                    coords: {
                        lat: 39.7527,
                        lng: -105.0017
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Union+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Colfax at Auraria Station
                    coords: {
                        lat: 39.7404,
                        lng: -105.0015
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Colfax+at+Auraria+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //Theatre District - Convention Center Station
                    coords: {
                        lat: 39.7439,
                        lng: -104.9961
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=Theatre+District-Convention+Center+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //16th & California Station
                    coords: {
                        lat: 39.7450,
                        lng: -104.9923
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=16th+California+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //18th & California Station
                    coords: {
                        lat: 39.7469,
                        lng: -104.9899
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=18th+California+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //20th & Welton Station
                    coords: {
                        lat: 39.7481,
                        lng: -104.9867
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=20th+Welton+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //25th & Welton Station
                    coords: {
                        lat: 39.7532,
                        lng: -104.9800
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=25th+Welton+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //27th & Welton Station
                    coords: {
                        lat: 39.7552,
                        lng: -104.9774
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=27th+Welton+Station,Denver+CO'>Click here</a>" + '</div>'
                },
                {
                    //30th & Downing Station
                    coords: {
                        lat: 39.7589,
                        lng: -104.9737
                    },
                    contentString: '<div class="content">' + "<a href='http://maps.google.com/?saddr=My+location&daddr=30th+Downing+Station,Denver+CO'>Click here</a>" + '</div>'
                }
            ];
            for (var i = 0; i < markers.length; i++) {
                addMarker(markers[i]);

            }

            function addMarker(props) {
                var marker = new google.maps.Marker({
                    position: props.coords,
                    map: map

                });
                marker.addListener('click', function() {
                    (new google.maps.InfoWindow({
                        content: props.contentString
                    })).open(map, marker);
                });

                function calcRoute() {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var end = {
                        lat: 39.5800,
                        lng: -105.0251
                    };
                    var request = {
                        origin: pos,
                        destination: end,
                        travelMode: google.maps.TravelMode.DRIVING

                    };

                }

            }
            infoWindow = new google.maps.InfoWindow;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude

                    };
                    console.log(pos);

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('You are here.');
                    infoWindow.open(map);
                    map.setCenter(pos);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }

        }