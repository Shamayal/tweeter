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
  }

$(document).ready(function() {
  // event listener for submit with preventDefault() inside the handler function
  $(".form-bar").on("submit", function(event) {
    event.preventDefault();
    // serialize turns set of form data into a query string
    let data = $(this).serialize();
    $.ajax({method: "POST", url: "/tweets", data, dataType: "text"});
  });

  // loops through tweets and calls the createTweetElement for each tweet
  const renderTweets = function(tweets) {
    // empty the tweets container
    $('#tweets-container').empty();
    // loop through tweets and callback to createTweetElement
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      // appends return value to tweets container
      $('#tweets-container').append($tweet); 
    }
  }
  
  // creates the tweet element based on data in the object
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="tweet">
      <header>
        <span class="icon-name">
          <img src="${tweetData.user.avatars}" alt="avatar icon">
          <p>${tweetData.user.name}</p>
        </span>
        <h4>${tweetData.user.handle}</h4>
      </header>
      <p class="tweet-message">${tweetData.content.text}</p>
      <footer>
        <h6>${tweetData.created_at}</h6>
        <span class="icons">
          <i class="fa-solid fa-flag";></i>
          <i class="fa-solid fa-retweet";></i>
          <i class="fa-solid fa-heart";></i>
        </span>
      </footer>
    </article>
    `;

    return $tweet;
  }

  // // makes requests to /tweets
  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET"})
    .then(data => {renderTweets(data)})
  }
  
  console.log(loadTweets());

  renderTweets(tweetData);
}); 