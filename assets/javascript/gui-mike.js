function update() {
  $("#currentTimeUpdate").text(moment().format('MMMM Do, YYYY | h:mm:ss A'));
}

setInterval(update, 1000);

$('#reset').click(function() {
    location.reload();
});
