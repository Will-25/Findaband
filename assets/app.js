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
        "<a href='#' target='_blank' class='text-right btn btn-primary tix-btn btn" +
          count +
          "'>"
      ).text("BUY TICKETS");
      $(".container" + count).append(button);
      count++;
    }
  };

  makeCard();

  var apiCall = function() {
    // Search bar on Home Page
    var artist = $("#band-search")
      .val()
      .trim();

    // Search bar on Band Page
    var secondArtist = $("#second-band-search")
      .val()
      .trim();

    // Clearing both inputs
    $("#band-search").val("");
    $("#second-band-search").val("");

  // Saving in memory
    var ajaxCall = function() {
      // Ajax call for bandsAPI
      $.ajax({
        url: bandsURL,
        method: "GET"
      }).then(function(response) {
        // Band Name
        var name = response.name;
        $(".band-name").text(name);
        // Band Image
        var image = response.image_url;
        console.log(image);
        $(".rounded-circle").attr("src", image);
        // Band Facebook Link
        var facebook = response.facebook_page_url;
        $(".btn-fb").attr("href", facebook);
      });

      // Ajax call for ticketAPI
      $.ajax({
        url: ticketURL,
        method: "GET"
      }).then(function(response) {
        // For loop that's pushing all the info into the Cards
        for (var i = 0; i < 5; i++) {
          // Venue Date
          var venueDate = response._embedded.events[i].dates.start.localDate;
          var convertTime = moment(venueDate, "YYYY/MM/DD").format("MMM D");
          $(".head" + [i]).text(convertTime);
          // Venue
          var venue = response._embedded.events[i]._embedded.venues[0].name;
          $(".venue" + [i]).text(venue);
          // City, State
          var city = response._embedded.events[i]._embedded.venues[0].city.name;
          var state =
            response._embedded.events[i]._embedded.venues[0].state.stateCode;
          $(".p" + [i]).text(city + ", " + state);
          // Url to ticket purchase
          var purchaseTicket = response._embedded.events[i].url;
          $(".btn" + [i]).attr("href", purchaseTicket);
        }
      });

      // Ajax call for tasteAPI
      $.ajax({
        url: tasteURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // Description of artist
        var artistBio = response.Similar.Info[0].wTeaser;
        $(".artist-bio").text(artistBio);
        // Related artist name
        var sim1 = response.Similar.Results[0].Name;
        $(".relArt1").text(sim1);
        var sim2 = response.Similar.Results[1].Name;
        $(".relArt2").text(sim2);
        var sim3 = response.Similar.Results[2].Name;
        $(".relArt3").text(sim3);
        var sim4 = response.Similar.Results[3].Name;
        $(".relArt4").text(sim4);
        // Related artist video thumbnail link
        var simImg1 = response.Similar.Results[0].yUrl;
        $(".relImg1").attr("src", simImg1);
        var simImg2 = response.Similar.Results[1].yUrl;
        $(".relImg2").attr("src", simImg2);
        var simImg3 = response.Similar.Results[2].yUrl;
        $(".relImg3").attr("src", simImg3);
        var simImg4 = response.Similar.Results[3].yUrl;
        $(".relImg4").attr("src", simImg4);
      });
    };

  // If search bar is not blank put artist in API url
    if (artist !== "") {
      var ticketURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" +
        artist +
        "&apikey=EUnqG6jlJ5Of975tN9AYBMOjFs1wpPt5";

      var bandsURL =
        "https://rest.bandsintown.com/artists/" +
        artist +
        "?app_id=06a0bf01f7da2f97b38deff3c911b9cd";

      var tasteURL =
        "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?limit=4&type=band&info=1&q=" +
        artist +
        "&k=345412-FINDABAN-G0RXKFDA";

    // Hide homescreen / Show BandPage
      $("#splashscreen").hide();
      $(".bandPageNew").show();
      ajaxCall();

    // Adding styles to our HTML
      document.body.style.backgroundColor = "#DDDDDD";
      $(".form-control").css("border", "solid grey 1px");
      $(".form-control").attr("class", "form-control mr-sm-2");

  // If second search bar is not blank put secondArtist in API url
    } else if (secondArtist !== "") {
      var ticketURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" +
        secondArtist +
        "&apikey=EUnqG6jlJ5Of975tN9AYBMOjFs1wpPt5";

      var bandsURL =
        "https://rest.bandsintown.com/artists/" +
        secondArtist +
        "?app_id=06a0bf01f7da2f97b38deff3c911b9cd";

      var tasteURL =
        "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?limit=4&type=band&info=1&q=" +
        secondArtist +
        "&k=345412-FINDABAN-G0RXKFDA";

      ajaxCall();

    // Adding style to our HTML
      $(".form-control").css("border", "solid grey 1px");
      $(".form-control").attr("class", "form-control mr-sm-2");
    } else {

      // Inputs get Red border and Shake animation
      $(".form-control").css("border", "solid red 1px");
      $(".form-control").attr("class", "form-control mr-sm-2 animated shake");
    }
  };

// Findaband Logo
  $("#homeButton").on("click", function(event) {
    event.preventDefault();
    $(".bandPageNew").hide();
    $("#splashscreen").show();
    document.body.style.backgroundColor = "#001f3f";
  });

// Homescreen search button
  $("#start-btn").on("click", function(event) {
    event.preventDefault();
    apiCall();
  });

// BandsPage search button
  $("#second-btn").on("click", function(event) {
    event.preventDefault();
    apiCall();
  });
});
