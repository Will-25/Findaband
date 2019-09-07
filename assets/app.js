$(document).ready(function() {
  var count = 0;
  var makeCard = function() {
    for (var i = 0; i < 5; i++) {
      var holder = $("<div class ='card card" + count + "'>");
      $(".cardHolder").append(holder);
      var title = $("<h2 class='card-header head" + count + "'>");
      $(".card" + count).append(title);
      var card = $("<div class ='card-body body" + count + "'>");
      $(".card" + count).append(card);
      var venue = $("<h3 class = 'card-title d-inline venue" + count + "'>");
      $(".body" + count).append(venue);
      var container = $("<div class='tix-btn container" + count + "'>");
      $(".body" + count).append(container);
      var right = $("<p class='text-right card-text d-inline p" + count + "'>");
      $(".container" + count).append(right);
      var button = $(
        "<a href='#' class='text-right btn btn-primary tix-btn btn" + count + "'>"
      ).text("BUY TICKETS");
      $(".container" + count).append(button);
      count++;
    }
  };

  var apiCall = function() {
    makeCard();

    var artist = $("#band-search")
      .val()
      .trim();

    var ticketURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" +
      artist +
      ticketAPI;
    var bandsURL = "https://rest.bandsintown.com/artists/" + artist + bandsAPI;

    // Ajax call for bandsAPI
    $.ajax({
      url: bandsURL,
      method: "GET"
    }).then(function (response) {
        // Band Name
        var name = response.name;
        $(".band-name").text(name)
        // Band Image
        var image = response.image_url;
        console.log(image);
        $(".rounded-circle").attr("src", image);
        // Band Facebook Link
        var facebook = response.facebook_page_url;
        $(".name").text(facebook);
    });

    // Ajax call for ticketAPI
    $.ajax({
      url: ticketURL,
      method: "GET"
    }).then(function(response) {

        for(var i = 0; i < 5; i++) {
            // Venue Date
            var venueDate = response._embedded.events[i].dates.start.localDate;
            var convertTime = moment(venueDate, "YYYY/MM/DD").format("MMM D");
            $(".head" + [i]).text(convertTime);
            // Venue
            var venue = response._embedded.events[i]._embedded.venues[0].name;
            $(".venue" + [i]).text(venue);
            // City, State
            var city = response._embedded.events[i]._embedded.venues[0].city.name;
            var state = response._embedded.events[i]._embedded.venues[0].state.stateCode;
            $(".p" + [i]).text(city + ", " + state);

        }

      // Url to ticket purchase
      console.log(response._embedded.events[0].url);
      // Venue name
      console.log(response._embedded.events[0]._embedded.venues[0].name);
      // State
      console.log(
        response._embedded.events[0]._embedded.venues[0].state.stateCode
      );
      // City
      console.log(response._embedded.events[0]._embedded.venues[0].city.name);
      // Address
      console.log(
        response._embedded.events[0]._embedded.venues[0].address.line1
      );
    });
  };

  $("#homeButton").on("click", function(event) {
    event.preventDefault();
    $("#splashscreen").show();
    $(".bandPageNew").hide();
    document.body.style.backgroundColor = "#001f3f";
    $("#band-search").val("");
  });

  $("#start-btn").on("click", function(event) {
    event.preventDefault();
    $("#splashscreen").hide();
    $(".bandPageNew").show();
    apiCall();
    document.body.style.backgroundColor = "#DDDDDD";
  });

  $("#second-btn").on("click", function(event) {
    event.preventDefault();
    apiCall();
  });
});