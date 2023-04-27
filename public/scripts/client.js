/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function that takes in tweet object and returns a tweet <article> element containing HTML structure of the tweet
// createTweetElement

$(document).ready(function() {

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

  // loops through tweets and calls the createTweetElement for each tweet
  const renderTweets = function(tweets) {
    // empty the tweets container
    $('#tweets-container').empty();
    // loop through tweets
    for (let tweet of tweets) {
      let $
    }
    //empty out tweets container 
    //callback createTweetElement(tweet)
    // append

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

      // const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  $('#tweets-container').append($tweet); 

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

  renderTweets(data);
}); 