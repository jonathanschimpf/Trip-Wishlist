$(document).ready(() => {

    $("#wishlistSearchAgainButton").on("click", function (event) {
        event.preventDefault();

        location.href = 'home.html'

    });

    function refreshPage() {

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
                 <div class="card savedSearchCardStyling">
                <img src="${info.museumImage}" class="card-img-top cardImageSizing" alt="...">
                <div class="card-body">
                <h5 class="card-title">${info.location}</h5><hr>
                <p><strong>Hotel: </strong>${info.hotelName}</p>‏‏‎
                <p><strong>Restaurant: </strong>${info.restaurantName}</p>‏‏‎
                <p><strong>Museum: </strong>${info.museumName}</p><hr>
                <a class="effect-shine" href="${info.hotelUrl}" target="_blank">View Hotel</a><br>
                <a class="effect-shine" href="${info.restaurantUrl}" target="_blank">View Restaurant</a><br>
                <a class="effect-shine" href="${info.museumUrl}" target="_blank">View Museum</a>‏‏‎
                <hr>
                <button id=${i} class="btn btn-secondary my-2 my-sm-0 tripDeleteButton" type="submit">Delete Trip</button>
                <br>
                <br>
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
                .then(function () {
                    console.log("Deleted Trip")
                    refreshPage();
                });
        }
    }

    refreshPage();

});