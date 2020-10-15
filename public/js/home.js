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

  var lat;
  var lng;

  // Variables for Restaurants

  // Details for Selected Hotel

  // Details for Selected Restaurant



  $("#citySearchButton").on("click", function (event) {
    event.preventDefault();
    $("#resultsJumbotron").removeClass("d-none");
    $("#resultsCards").removeClass("d-none");
    $("#homeSearch").addClass("d-none");
    var searchTermOriginal = $("#citySearchInput").val().trim();
    searchTerm = searchTermOriginal.replaceAll(" ", "%20");
    getCityDataThenHotels();
  });



  // Get city data and local hotels
  
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



  // Get list of local restaurants
  
  function getRestaurants() {
    // Searching for Restaurants
    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=10&type=restaurant&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (restaurantsResponse) {

      // Console.log result of restaurants
      console.log(restaurantsResponse);

    });
  };



  // Getting the Details for the Selected Hotel and Restaurant

  function getDetails() {
    // Searching for Specific Hotel Details
    var queryURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + hotelPlaceID + "&fields=name,rating,formatted_phone_number,url,website&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (hotelDetails) {

      // Console.log specific Restaurant of the hotel
      console.log(hotelDetails);

      // Searching for Specific Restaurant Details
      var queryURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + restaurantPlaceID + "&fields=name,rating,formatted_phone_number,url,website&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (restaurantDetails) {

        // Console.log specific details of the restaurant
        console.log(restaurantDetails);

      });
    });
  };
});