var redditbuttonclicked = false;



$('#Reddit').on('click', function(){
	if (redditbuttonclicked===false) {
		redditbuttonclicked = true;
			var x = $(this).data('news');
			var queryURL = 'https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=fc8ac59d4e93405f9f7f701932643050';
			$.ajax({url:queryURL,
						method:'GET'})
				.done(function(response){
					for (var i = 0; i<response.articles.length;i++) {
						var newsDiv = $('<div>');
						var p = $('<p>').text(response.articles[i].title);
						var articlelink = $('<div>').html('<a target="_blank" href="' + response.articles[i].url + '"><img src=' + response.articles[i].urlToImage + '></a>');

						newsDiv.append(p);
						newsDiv.append(articlelink);
						$('#newsGoesHere').prepend(newsDiv);

						}
				});
			} else {
				redditbuttonclicked = false;
				$('#newsGoesHere').html('');
			}
		});

var espnbuttonclicked = false;

$('#ESPN').on('click', function(){

	if (espnbuttonclicked===false) {
		espnbuttonclicked = true;

			var x = $(this).data('news');
			var queryURL = 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=fc8ac59d4e93405f9f7f701932643050';
			$.ajax({url:queryURL,
						method:'GET'})
				.done(function(response){
					for (var i = 0; i<response.articles.length;i++) {
						var newsDiv = $('<div>');
						var p = $('<p>').text(response.articles[i].title);
						var link = $('<div>').html('<a target="_blank" href="' + response.articles[i].url + '"><img src=' + response.articles[i].urlToImage + '></a>');

						newsDiv.append(p);
						newsDiv.append(link);
						$('#newsGoesHere').prepend(newsDiv);					
					}
				});
			} else {
				espnbuttonclicked = false;
				$('#newsGoesHere').html('');
			}
		});