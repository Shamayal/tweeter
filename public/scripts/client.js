/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(function() {
  // event listener for submit with preventDefault() inside the handler function
  $(".form-bar").on("submit", function(event) {
    event.preventDefault();

    let tweetInput = $("#tweet-text").val();
    // error if tweet more than 140 characters
    if (tweetInput.length >= 141) {
      alert("You have exceeded the maximum number of characters allowed for a tweet!");
      // error if no input
    } else if (tweetInput.length === 0) {
      alert("Please write something to post a tweet!");
    } else {

      // serialize turns set of form data into a query string
      let data = $(this).serialize();

      // post request to send data to server
      $.ajax({
        method: "POST",
        url: "/tweets",
        data,
        dataType: "text",
      }).then(function() {
        loadTweets();
        $("#tweet-text").val("");
        console.log(data);
      });
    }
  });

  // prevent XSS with escaping
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // loops through tweets and calls the createTweetElement for each tweet
  const renderTweets = function(tweets) {
    // resets the tweets container
    $('#tweets-container').empty();
    // loop through tweets and callback to createTweetElement
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      // adds return value to tweets container
      $('#tweets-container').prepend($tweet);
    }
  };
  
  // creates the tweet element based on data in the object
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

  // makes requests to load tweets upon page load
  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
    }).then(data => {
      renderTweets(data);
    });
  };

  loadTweets();

});