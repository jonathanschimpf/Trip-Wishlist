$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".member-name").text(data.email);
  // });

  const cityInput = $("input#citySearchInput");

  $("#citySearchButton").on("click", function (event) {
    event.preventDefault();
    // $("ENTER JUMBOTRON RESULTS ID").removeClass("hide");
    // $("ENTER RESULTS CARD CLASS/ID").removeClass("hide");
    $("#homeSearch").addClass("hide");
    getCityData();
  });

  function getCityData() {

    // var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + cityInput + "&inputype=textquery&fields=photos,formatted_address,name,rating,opening_hours&key=AIzaSyB5T-Nu0v6U-8hSe_X9GqG3yjDdur5Ppyk"

    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyANZUDCKbS7yUeabpf9yIcjCpISRowjMu0"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    });
  };
});
