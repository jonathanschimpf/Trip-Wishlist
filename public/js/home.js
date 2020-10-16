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

      $("#cityName").text(searchTerm);
      $("#hotelGreeting").text("Select your ideal accommodation below.");

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

      let html = ""

      // clearing results after each search.
      $("#hotelCards").empty();

      // placing information from here into a generated cards
      hotelsResponse.businesses.forEach((hotel, i) => {

        if (i < 18) {

          html += `<div class="col mb-4 my-4">
          <div class="card">
          <img src="${hotel.image_url}" class="card-img-top cardImageSizing" alt="...">
            <div class="card-body">
            <h5 class="card-title">${hotel.name}</h5>
                <hr>
            <p>Address: ${hotel.location.address1}</p>
            <p>${hotel.location.city}, ${hotel.location.state} ${hotel.location.zip_code}</p>
            <hr>
            <a class="effect-shine" href="${hotel.url}" target="_blank">View Hotel</a>‏‏‎
            <br>
            <hr>
            <button id=${i} class="btn btn-secondary my-2 my-sm-0 hotelSelector" type="submit">Save Hotel</button>
            </div>
          </div>
        </div>`
        }
      });

      $("#hotelCards").append(html);

      $(".hotelSelector").on("click", function (event) {


        event.preventDefault();
        lat = hotelLatitude[this.id];
        long = hotelLongitude[this.id];
        searchRestaurants();

      });

    });

  };



  // Select Hotel

  function selectHotel() {
    // lat = hotelLatitude[i];
    // long = hotelLongitude[i];
  }



  // Get list of local restaurants

  function searchRestaurants() {

    $("#cityName2").text(searchTerm);
    $("#restaurantGreeting").text("Select a dining preference below.");

    $("#resultsCards").addClass("d-none");
    $("#resultsJumbotron").addClass("d-none");
    $("#resultsJumbotron2").removeClass("d-none");
    $("#resultsCards2").removeClass("d-none");
    $("#hotelGreeting").addClass("d-none");
    $("#restaurantGreeting").removeClass("d-none");
    
    // Searching for Restaurants
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=" + lat + "&longitude=" + long + "&radius=" + radius

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

      let html = ""

      // clearing results after each search.
      $("#hotelCards").empty();
      $("#restaurantCards").empty();

      // placing information from here into a generated cards
      restaurantsResponse.businesses.forEach((restaurant, i) => {

        if (i < 18) {

          html += `<div class="col mb-4 my-4">
        <div class="card">
        <img src="${restaurant.image_url}" class="card-img-top cardImageSizing" alt="...">
          <div class="card-body">
          <h5 class="card-title">${restaurant.name}</h5>
              <hr>
          <p>Address: ${restaurant.location.address1}</p>
          <p>${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}</p>
          <hr>
          <a class="effect-shine" href="${restaurant.url}" target="_blank">View Restaurant</a>‏
          <br>
          <hr>‏‏‎‏‏‎‏‏‎
          <button id=${i} class="btn btn-secondary my-2 my-sm-0 restaurantSelector" type="submit">Save Restaurant</button>
          </div>
        </div>
      </div>`
        }
      });

      $("#restaurantCards").append(html);

      $(".restaurantSelector").on("click", function (event) {


        event.preventDefault();
        searchMuseums();


      });

    });

  };

  function searchMuseums() {

    $("#cityName3").text(searchTerm);
    $("#museumGreeting").text("Select a museum experience below.");

    $("#resultsCards2").addClass("d-none");
    $("#resultsJumbotron2").addClass("d-none");
    $("#resultsJumbotron3").removeClass("d-none");
    $("#resultsCards3").removeClass("d-none");
    $("#restaurantGreeting").addClass("d-none");
    $("#museumGreeting").removeClass("d-none");

        // Searching for Museums
        
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=museums&latitude=" + lat + "&longitude=" + long + "&radius=" + radius

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer 9IjGkqLOG2uOZj7FFlalM357o1tEOz_z0_qEjovAcnTGUag2dDiKr9IFeszdJOX0YZK1gmTLSpsb2wHqpOoCll95ZWNISAskRrRVvrbbQvc5j_fq1PiQCyQndaeIX3Yx",
    },
    dataType: 'json',
    }).then(function (museumsResponse) {

      // Console.log result of Museums

      console.log(museumsResponse);


      let html = ""

      // clearing results after each search.
      $("#hotelCards").empty();
      $("#restaurantCards").empty();
      $("#museumCards").empty();

      // placing information from here into a generated cards
      museumsResponse.businesses.forEach((museum, i) => {

        if (i < 18) {

          html += `<div class="col mb-4 my-4">
        <div class="card">
        <img src="${museum.image_url}" class="card-img-top cardImageSizing" alt="...">
          <div class="card-body">
          <h5 class="card-title">${museum.name}</h5>
              <hr>
          <p>Address: ${museum.location.address1}</p>
          <p>${museum.location.city}, ${museum.location.state} ${museum.location.zip_code}</p>
          <hr>
          <a class="effect-shine" href="${museum.url}" target="_blank">View Museum</a>‏‏‎
          <br>
          <hr>‏‏‎
          <button id=${i} class="btn btn-secondary my-2 my-sm-0 museumSelector" type="submit">Save Museum</button>
          </div>
        </div>
      </div>`
        }
      });

      $("#museumCards").append(html);

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