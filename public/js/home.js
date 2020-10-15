$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".member-name").text(data.email);
  // });
  var searchTerm;

  // Variables for City
  var cityName;
  var cityImage;

  // Variables for Hotels
  var hotelNames = [];
  var hotelImages = [];
  var hotelLocationsLat = [];
  var hotelLocationsLng = [];

  $("#citySearchButton").on("click", function (event) {
    event.preventDefault();
    $("#homeSearch").addClass("d-none");
    $("#resultsJumbotron").removeClass("d-none");
    $("#resultsCards").removeClass("d-none");
    
    var searchTermOriginal = $("#citySearchInput").val().trim();
    searchTerm = searchTermOriginal.replaceAll(" ", "%20");
    getCityDataThenHotels();
  });
  function getCityDataThenHotels() {
    // Searching for City
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + searchTerm + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (cityResponse) {

      // Console.log result of city
      console.log(cityResponse);

      cityName = cityResponse.candidates[0].name;
      cityImage = cityResponse.candidates[0].photos[0].html_attributions[0];

      console.log("cityName");
      console.log(cityName);
      console.log("cityImage");
      console.log(cityImage);
      
      // Searching for Hotels in the city
      var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+" + searchTerm + "&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (hotelsResponse) {

        // Console.log hotel results
        console.log(hotelsResponse);

        for (let i = 0; i < hotelsResponse.results.length; i++) {
          hotelNames.push(hotelsResponse.results[i].name);
          hotelImages.push(hotelsResponse.results[i].photos[0].html_attributions[0]);
          hotelLocationsLat.push(hotelsResponse.results[i].geometry.location.lat);
          hotelLocationsLng.push(hotelsResponse.results[i].geometry.location.lng);
        }
      });
    });
  };
});