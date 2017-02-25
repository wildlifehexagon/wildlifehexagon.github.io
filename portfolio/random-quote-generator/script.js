$(document).ready(function() {

  var randomQuote = '';

  createQuote();

  $('.button').click(function() {
    createQuote();
  });

  $(".twitter").click(function() {
   var tweet = "https://twitter.com/intent/tweet?text=" + randomQuote + " - Charles Bukowski";
   window.open(tweet, "twitter");
   return false;
 });

function createQuote() {

  var quotation = new Array();

  quotation[0] = "Some people never go crazy. What truly horrible lives they must lead.";
  quotation[1] = "We are here to laugh at the odds and live our lives so well that Death will tremble to take us.";
  quotation[2] = "The free soul is rare, but you know it when you see it - basically because you feel good, very good, when you are near or with them.";
  quotation[3] = "The difference between a democracy and a dictatorship is that in a democracy you vote first and take orders later; in a dictatorship you don't have to waste your time voting.";
  quotation[4] = "An intellectual says a simple thing in a hard way. An artist says a hard thing in a simple way.";
  quotation[5] = "If you're losing your soul and you know it, then you've still got a soul left to lose.";
  quotation[6] = "Genius might be the ability to say a profound thing in a simple way.";
  quotation[7] = "Of course it's possible to love a human being if you don't know them too well.";
  quotation[8] = "Never get out of bed before noon.";
  quotation[9] = "Humanity, you never had it to begin with.";
  quotation[10] = "I couldn't take it anymore where you're at, you know, so I quit. ma, I got a job right away. wow, a change, you know. that's what kills a man: lack of change.";

   randomQuote = quotation[Math.floor(Math.random() * quotation.length)];

    $(".quotes").text(randomQuote);
}

});
