// character count function

$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    let charLeft = 140 - this.value.length;

    let counter = $(this).parent(".form-bar").find(".counter");
    counter.text(charLeft);

    if (charLeft < 0) {
      counter.addClass("exceed-limit");
    } else {
      counter.removeClass("exceed-limit");
    }

  });
});