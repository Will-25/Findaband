$(document).ready(function () {
  var count = 0;
  var makeCard = function () {
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

  var apiCall = function () {
    var artist = $("#band-search")
      .val()
      .trim();

    var secondArtist = $("#second-band-search")
      .val()
      .trim();

    $("#band-search").val("");
    $("#second-band-search").val("");

    if (artist !== "") {
      var ticketURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" +
        artist +
        ticketAPI;

      var bandsURL =
        "https://rest.bandsintown.com/artists/" + artist + bandsAPI;

      var tasteURL =
        "http://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?limit=4&type=band&info=1&q=" +
        artist +
        tasteAPI;
    } else {
      var ticketURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" +
        secondArtist +
        ticketAPI;

      var bandsURL =
        "https://rest.bandsintown.com/artists/" + secondArtist + bandsAPI;

      var tasteURL =
        "http://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?limit=4&type=band&info=1&q=" +
        secondArtist +
        tasteAPI;
    }
    console.log(tasteURL);

    // Ajax call for bandsAPI
    $.ajax({
      url: bandsURL,
      method: "GET"
    }).then(function (response) {
      // Band Name
      var name = response.name;
      $(".band-name").text(name);
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
    }).then(function (response) {

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
    }).then(function (response) {
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

  $("#homeButton").on("click", function (event) {
    event.preventDefault();
    $("#splashscreen").show();
    $(".bandPageNew").hide();
    document.body.style.backgroundColor = "#001f3f";
    $("#band-search").val("");
  });

  $("#start-btn").on("click", function (event) {
    event.preventDefault();
    $("#splashscreen").hide();
    $(".bandPageNew").show();
    apiCall();
    document.body.style.backgroundColor = "#DDDDDD";
  });

  $("#second-btn").on("click", function (event) {
    event.preventDefault();
    apiCall();
  });
});
