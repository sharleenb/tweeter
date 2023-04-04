/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: (response) => {
        renderTweets(response);
      },
    });
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const $tweet = `
    <article class="tweet"> 
      <header>
        <img src=${tweet["user"].avatars} alt="profile picture" />
        <div>
        <h5>${tweet["user"].name}</h5> 
        <h5 class="handle">${tweet["user"].handle}</h5>
        </div>
      </header>
      <p> ${escape(tweet["content"].text)} </p>
      <hr></hr>
      <footer> 
        <div class="days">${timeago.format(tweet.created_at, "en_US")}</div>
        <div>
          <i class="fa-solid fa-flag"></i> 
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;

    return $tweet;
  };

  const $button = $("#submit");
  $button.submit(function (event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    const counter = $(this).find("output.counter")[0];
    if (counter.innerHTML < 0) {
      $(".exceedChar").show();
    } else if (counter.innerHTML == 140) {
      $(".emptyTweet").show();
    } else {
      $(".exceedChar").hide(),
      $(".emptyTweet").hide(),
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: tweetData,
          success: (response) => {
            loadTweets();
          },
        });
        counter.innerHTML = 140;
        let tweetValue = $(this).find("textarea")[0];
        tweetValue.value = '';
    }
  });

  loadTweets();
});
