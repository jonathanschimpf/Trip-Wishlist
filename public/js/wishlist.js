$(document).ready(() => {

    $.get("/api/user_data").then(data => {

        // $(".member-name").text(data.email);
        var currentUser = data.email;

        console.log(currentUser);

        $.get("/api/trip/user/" + currentUser).then(data => {

            console.log(data);

            let html = ""

            // clearing results after each search.
            $("#wishlistCards").empty();

            // placing information from here into a generated cards
            data.forEach((info, i) => {

                if (i < data.length) {

    html += `<div class="col mb-4 my-4">
    <div class="card">
    <img src="${info.museumImage}" class="card-img-top cardImageSizing" alt="...">
      <div class="card-body">
      <h5 class="card-title">${info.location}</h5>
          <hr>
      <p> Selected Hotel: ${info.hotelName}</p>
      <a class="effect-shine" href="${info.hotelUrl}" target="_blank">View Hotel</a>‏‏‎
      <br>
      <hr>
      <p> Selected Restaurant: ${info.restaurantName}</p>
      <a class="effect-shine" href="${info.restaurantUrl}" target="_blank">View Restaurant</a>‏‏‎
      <br>
      <hr>
      <p> Selected Museum: ${info.museumName}</p>
      <a class="effect-shine" href="${info.museumUrl}" target="_blank">View Museum</a>‏‏‎
      <br>
      <hr>
      <button id=${i} class="btn btn-secondary my-2 my-sm-0 tripDeleteButton" type="submit">Delete Itinerary</button>
      </div>
    </div>
  </div>`

                }
            });

            $("#wishlistCards").append(html);

            $(".tripDeleteButton").on("click", function (event) {
                event.preventDefault();
        
                deleteTrip(data[this.id].id);
        
              });

        });
    });

    function deleteTrip(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/trip/" + id
        })
          .then(function() {
            console.log("Deleted Trip")
            
            location.href='wishlist.html'
          });
      }
});



