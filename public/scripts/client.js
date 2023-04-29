/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // event listener for submit with preventDefault() inside the handler function
  $(".form-bar").on("submit", function(event) {
    event.preventDefault();

    // assigning a variable for the tweet typed in the form
    let tweetInput = $("#tweet-text").val();

    // error messages pop up for min and max lenghts
    if (tweetInput.length >= 141) {
      $(".error-message-max").slideDown();
      // error if no input
    } else if (tweetInput.length === 0) {
      $(".error-message-null").slideDown();
    } else {

      // serialize turns set of form data into a query string
      let data = $(this).serialize();

      // remove the error messages
      if ($(".error-message-max").first().is(":visible")) {
        $(".error-message-max").slideUp();
      }
      if ($(".error-message-null").first().is(":visible")) {
        $(".error-message-null").slideUp();
      }
    
      // post request to send data to server
      $.ajax({
        method: "POST",
        url: "/tweets",
        data,
        dataType: "text",
      }).then(function() {
        loadTweets();
        // reset the form text and counter
        $("#tweet-text").val("");
        $(".counter").val(140);
      });
    }
  });

  // prevent XSS with escaping
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // loops through data to create a new post element
  const renderTweets = function(tweets) {
    // resets the tweets container to avoid posting same tweet twice
    $('#tweets-container').empty();
    // loop through tweets and callback to createTweetElement
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      // adds return value to tweets container
      $('#tweets-container').append($tweet);
    }
  };
  
  // creates the tweet element based on data in the object (example username, name, etc.)
  const createTweetElement = function(tweetData) {
    let $tweet = `
    <article class="tweet">
      <header>
        <span class="icon-name">
          <img src="${tweetData.user.avatars}" alt="avatar icon">
          <p>${tweetData.user.name}</p>
        </span>
        <h4>${tweetData.user.handle}</h4>
      </header>
      <p class="tweet-message">${escape(tweetData.content.text)}</p>
      <footer>
        <h6>${timeago.format(tweetData.created_at)}</h6>
        <span class="icons">
          <i class="fa-solid fa-flag";></i>
          <i class="fa-solid fa-retweet";></i>
          <i class="fa-solid fa-heart";></i>
        </span>
      </footer>
    </article>
    `;

    return $tweet;
  };

  // makes requests to load tweets upon page load and post new tweet
  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
    }).then(data => {
      // callback to the new tweet post
      renderTweets(data);
    });

    // hides error messages
    $(".error-message-max").hide();
    $(".error-message-null").hide();
  };

  loadTweets();

});