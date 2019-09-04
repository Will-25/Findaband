$(document).ready(function() {
  var artist = "ariana grande";


 
  var ticketURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" +
    artist +
    ticketAPI ;
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
    // Url to ticket purchase
    console.log(response._embedded.events[0].url);
    // Venue date
    console.log(response._embedded.events[0].dates.start.localDate);
    // Venue time
    console.log(response._embedded.events[0].dates.start.localTime);
    // Venue name
    console.log(response._embedded.events[0]._embedded.venues[0].name);
    // State
    console.log(
      response._embedded.events[0]._embedded.venues[0].state.stateCode
    );
    // City
    console.log(response._embedded.events[0]._embedded.venues[0].city.name);
    // Address
    console.log(response._embedded.events[0]._embedded.venues[0].address.line1);
  });

  // PriceRange????
});
