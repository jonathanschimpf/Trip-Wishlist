$(document).ready(() => {

    $.get("/api/user_data").then(data => {
        // $(".member-name").text(data.email);
        var currentUser = data.email;
        
        console.log(currentUser);

        $.get("/api/trip/user/" + currentUser).then(data => {
            console.log(data);








        });
    });
});