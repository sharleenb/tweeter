/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const loadTweets = function() {
    const $button = $("#submit");
    $button.submit(function() {
    $.ajax({
      type: "GET", 
      url: "/tweets", 
      success: (response) => {
        renderTweets(response)
      },
    })
  })
}
  
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
      };
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
  
  const createTweetElement = function(tweet) {
    const $tweet = `
    <article class="tweet"> 
      <header>
        <img src=${tweet["user"].avatars} alt="profile picture" />
        <h5>${tweet["user"].name}</h5> 
        <h4>${tweet["user"].handle}</h4>
      </header>
      <p> ${tweet["content"].text} </p>
      <footer> 
        <p>${tweet.created_at}</p>
        <div>
          <i class="fa-solid fa-flag"></i> 
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  
    return $tweet;
  }
  
  loadTweets()
  
});
