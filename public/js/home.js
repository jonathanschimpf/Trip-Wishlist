$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".member-name").text(data.email);
  // });

  var searchTerm;
  
  $("#citySearchButton").on("click", function (event) {
    event.preventDefault();

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
    }).then(function (response) {

      // Console.log result of city
      console.log(response);

      // Searching for Hotels in the city
      var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+" + searchTerm + "&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        // Console.log hotel results
        console.log(response);
      });
    });
  };
});
