// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });



  // Routes for Trip Table

  // Create a new trip
  app.post("/api/trip", (req, res) => {
    db.Trip.create({
      user: req.body.user,
      location: req.body.location,
      hotelName: req.body.hotelName,
      hotelImage: req.body.hotelImage,
      hotelUrl: req.body.hotelUrl,
      hotelAddress: req.body.hotelAddress,
      restaurantName: req.body.restaurantName,
      restaurantImage: req.body.restaurantImage,
      restaurantUrl: req.body.restaurantUrl,
      restaurantAddress: req.body.restaurantAddress,
      museumName: req.body.museumName,
      museumImage: req.body.museumImage,
      museumUrl: req.body.museumUrl,
      museumAddress: req.body.museumAddress,
    }).then(function(dbTrip) {
      res.json(dbTrip);
    });
  });

  // Read ALL info about ALL trips of ONE user
  app.get("/api/trip/user/:user", function (req, res) {
    db.Trip.findAll({
      where: {
        user: req.params.user
      },
    }).then(function (dbTrip) {
      res.json(dbTrip);
    });
  });

  // PUT route for updating trips
  app.put("/api/trip", function (req, res) {
    db.Trip.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbTrip) {
        res.json(dbTrip);
      });
  });

  // DELETE route for deleting trips
  app.delete("/api/trip/:id", function (req, res) {
    db.Trip.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbTrip) {
        res.json(dbTrip);
      });
  });
};
