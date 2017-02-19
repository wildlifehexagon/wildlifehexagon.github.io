$(document).ready(function() {
  // upon loading, immediately focus on search box
  $("#searchTerm").focus();

  // perform search if Enter is pushed
  $(document).keypress(function(e) {
    if (e.which === 13) {
      $("#search").click();
    }
  });

  $("#search").click(function() {
    // store term from search box
    var searchTerm = $("#searchTerm").val();
    // store Wikipedia API URL
    var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";

    // set variable to stop request if it runs too long (i.e. does not find results)
    var wikiRequestTimeout = setTimeout(function() {
      $("#output").html("<div><div class='well'>No search results found. Please try something else.</div></div>");
    }, 3000);

    // get data from Wikipedia using AJAX
    $.ajax({
      type: 'GET',
      url: wikiURL,
      async: false,
      dataType: 'json',
      success: function(data) {
        // this function shows what content to display
        $("#output").html('');
        for (var i = 0; i < data[1].length; i++) {
            // add results to page
          $("#output").append("<div><div class='well'><a href=" + data[3][i] + " target='_blank'><h2>" + data[1][i] + "</h2></a>" + "<p>" + data[2][i] + "</p></div></div>");
        // stop timeout from happening
        clearTimeout(wikiRequestTimeout);
        // resets searchbox
        $("#searchTerm").val('');
      };
    }
  });

  });

});
