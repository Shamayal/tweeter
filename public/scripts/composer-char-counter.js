// character count function

$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    let charLgeft = 140 - this.value.length;

    let $counter = $(this).parent(".form-bar").find(".counter");
    $counter.text(charLeft);
    console.log
  });
});