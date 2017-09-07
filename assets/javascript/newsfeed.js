$('#Reddit').on('click', function(){
			var x = $(this).data('news');
			var queryURL = 'https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=fc8ac59d4e93405f9f7f701932643050';
			$.ajax({url:queryURL,
						method:'GET'})
				.done(function(response){
					for (var i = 0; i<response.articles.length;i++) {
						var newsDiv = $('<div>');
						var p = $('<p>').text('Title: '+response.articles[i].title);
						var link = $('<a>').attr('src',+response.articles[i].url);
						var articleImage = $('<img>');
						articleImage.attr('src',response.articles[i].urlToImage);

						newsDiv.append(p);
						newsDiv.append(link);
						newsDiv.append(articleImage);
						$('#newsGoesHere').append(newsDiv);
						
					}
				});
		});


			$('#ESPN').on('click', function(){
			var x = $(this).data('news');
			var queryURL = 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=fc8ac59d4e93405f9f7f701932643050';
			$.ajax({url:queryURL,
						method:'GET'})
				.done(function(response){
					for (var i = 0; i<response.articles.length;i++) {
						var newsDiv = $('<div>');
						var articleLink = $('<div>');
						articleLink.attr('href',response.articles[i].url);
						var p = $('<p>').text('Title: '+response.articles[i].title);
						var articleImage = $('<img>');
						articleImage.attr('src',response.articles[i].urlToImage);
						newsDiv.append(p);
						newsDiv.append(articleLink);
						newsDiv.append(articleImage);
						$('#newsGoesHere').append(newsDiv);

						
					}
				});
		});