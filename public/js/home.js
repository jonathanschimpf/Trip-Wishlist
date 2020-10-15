$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".member-name").text(data.email);
  // });

  var searchTerm;

  // Variables for City

  // Variables for Hotels
  var hotelNames = [];
  var hotelImages = [];
  var hotelUrls = [];
  var hotelAddresses = [];
  var hotelLatitude = [];
  var hotelLongitude = [];

  var lat;
  var long;
  var radius = "16093";

  // 24140 meters = 15 miles
  // 16093 meters = 10 miles

  // Variables for Restaurants

  // Details for Selected Hotel

  // Details for Selected Restaurant



  $("#citySearchButton").on("click", function (event) {
    event.preventDefault();
    $("#homeSearch").addClass("d-none");
    $("#resultsJumbotron").removeClass("d-none");
    $("#resultsCards").removeClass("d-none");
    
    searchTerm = $("#citySearchInput").val().trim();
    searchHotels();
  });



  // Get hotels in the city
  
  function searchHotels() {
    // Searching for Hotels in the city
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + "hotels" + "&location=" + searchTerm

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer 9IjGkqLOG2uOZj7FFlalM357o1tEOz_z0_qEjovAcnTGUag2dDiKr9IFeszdJOX0YZK1gmTLSpsb2wHqpOoCll95ZWNISAskRrRVvrbbQvc5j_fq1PiQCyQndaeIX3Yx",
    },
    dataType: 'json',
    }).then(function (hotelsResponse) {

      // Console.log hotel results
      console.log(hotelsResponse);

      for (let i = 0; i < hotelsResponse.businesses.length; i++) {
        hotelNames.push(hotelsResponse.businesses[i].name);
        hotelImages.push(hotelsResponse.businesses[i].image_url);
        hotelUrls.push(hotelsResponse.businesses[i].url);
        hotelAddresses.push(hotelsResponse.businesses[i].location.address1);
        hotelLatitude.push(hotelsResponse.businesses[i].coordinates.latitude);
        hotelLongitude.push(hotelsResponse.businesses[i].coordinates.longitude);
      }
    });
  };



  // Select Hotel

  function selectHotel(){
    // lat = hotelLatitude[i];
    // long = hotelLongitude[i];
  }



  // Get list of local restaurants
  
  function searchRestaurants() {
    // Searching for Restaurants
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=hotels&latitude=" + lat + "&longitude=" + long + "&radius=" + radius

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer 9IjGkqLOG2uOZj7FFlalM357o1tEOz_z0_qEjovAcnTGUag2dDiKr9IFeszdJOX0YZK1gmTLSpsb2wHqpOoCll95ZWNISAskRrRVvrbbQvc5j_fq1PiQCyQndaeIX3Yx",
    },
    dataType: 'json',
    }).then(function (restaurantsResponse) {

      // Console.log result of restaurants
      console.log(restaurantsResponse);

    });
  };
});

























// // Get city data and local hotels
  
// function getCityDataThenHotels() {
//   // Searching for City
//   var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + searchTerm + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (cityResponse) {

//     // Console.log result of city
//     console.log(cityResponse);

//     cityName = cityResponse.candidates[0].name;
//     cityImage = cityResponse.candidates[0].photos[0].html_attributions[0];

//     console.log("cityName");
//     console.log(cityName);
//     console.log("cityImage");
//     console.log(cityImage);

//     // Searching for Hotels in the city
//     var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+" + searchTerm + "&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (hotelsResponse) {

//       // Console.log hotel results
//       console.log(hotelsResponse);

//       for (let i = 0; i < hotelsResponse.results.length; i++) {
//         hotelNames.push(hotelsResponse.results[i].name);
//         hotelImages.push(hotelsResponse.results[i].photos[0].html_attributions[0]);
//         hotelLocationsLat.push(hotelsResponse.results[i].geometry.location.lat);
//         hotelLocationsLng.push(hotelsResponse.results[i].geometry.location.lng);
//       }
//     });
//   });
// };



// // Get list of local restaurants

// function getRestaurants() {
//   // Searching for Restaurants
//   var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=10&type=restaurant&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (restaurantsResponse) {

//     // Console.log result of restaurants
//     console.log(restaurantsResponse);

//   });
// };



// // Getting the Details for the Selected Hotel and Restaurant

// function getDetails() {
//   // Searching for Specific Hotel Details
//   var queryURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + hotelPlaceID + "&fields=name,rating,formatted_phone_number,url,website&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (hotelDetails) {

//     // Console.log specific Restaurant of the hotel
//     console.log(hotelDetails);

//     // Searching for Specific Restaurant Details
//     var queryURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + restaurantPlaceID + "&fields=name,rating,formatted_phone_number,url,website&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (restaurantDetails) {

//       // Console.log specific details of the restaurant
//       console.log(restaurantDetails);

//     });
//   });
// };