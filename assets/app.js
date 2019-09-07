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
      var right = $("<p class='text-right card-text d-inline p" + count + "'>");
      $(".body" + count).append(right);
      var button = $(
        "<a href='#' class='text-right btn btn-primary tix-btn btn" + count + "'>"
      ).text("BUY TICKETS");
      $(".body" + count).append(button);
      count++;
    }
    // var row = $("<div class= 'col-md-6 cardHolder" + count + "'>")
    // $(".row").append(row)
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
    }).then(function(response) {
      // Band Name
      console.log(response.name);
      // Band Image
      console.log(response.image_url);
      // Band Facebook Link
      console.log(response.facebook_page_url);
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
