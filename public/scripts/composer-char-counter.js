$(document).ready(function() {
const tweetText  = $('textarea');
tweetText.on('input', function() {
  const parentNode = $(this).parent()
  const childNode = parentNode.find('output.counter')[0]
  let inputLength = $(this).val().length
  childNode.innerHTML = 140 - inputLength;
  
  if (childNode.innerHTML < 0) {
    $(childNode).css("color", "red")
  } 
})
});

