// character count function

$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    const charLeft = 140 - this.value.length;

    // updates the character count value to the counter class
    const counter = $(this).parent(".form-bar").find(".counter");
    counter.text(charLeft);

    // creates a new class for errors to change the color of the counter
    if (charLeft < 0) {
      counter.addClass("exceed-limit");
    } else {
      counter.removeClass("exceed-limit");
    }

  });
});