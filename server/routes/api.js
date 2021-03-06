const { response } = require("express");
const express = require("express");
const router = express.Router();
const customersQueries = require("../db/queries/customer-queries");
const eventQuery = require("../db/queries/events-queries");
const userQuery = require("../db/queries/users-queries");

//DB test
router.get("/customers", (req, res) => {
  customersQueries.getAllCustomers().then((response) => {
    res.json(response);
  });
});

router.get("/test", (req, res) => {
  eventQuery.getAllTest().then((response) => {
    res.json(response);
  });
});

router.get("/requested", (req, res) => {
  eventQuery.getAllRequestsForHost(req.session.user_id).then((response) => {
    // if (req.session.user_id !== response[0].host_id) {
    //   return res.json({"are you the owner? ": "Nahh"})
    // }
    res.json(response);
  });
});

//Events Route

//get all events from DB
router.get("/events", (req, res) => {
  eventQuery.getAllEvents().then((response) => {
    res.json(response);
  });
});

//add event
router.post("/events", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const address = req.body.address;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const price = req.body.price;
  const population = 1;
  const description = req.body.description;
  const eventPrivate = req.body.eventPrivate;
  const ageRange = req.body.agerange;
  const host_id = req.session.user_id;

  //Lets a user add an event
  eventQuery
    .addEvent(
      name,
      date,
      address,
      start_time,
      end_time,
      price,
      population,
      description,
      eventPrivate,
      ageRange,
      host_id
    )
    .then(() => {
      res.redirect("/");
    });
});

//Edit an event
router.post("/events/:id", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const address = req.body.address;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const price = req.body.price;
  const population = 1;
  const description = req.body.description;
  const eventPrivate = req.body.eventPrivate;
  const ageRange = req.body.agerange;
  const host_id = req.session.user_id;
  const event_id = req.params.id;
  //Lets a user add an event
  eventQuery
    .editEvent(
      name,
      date,
      address,
      start_time,
      end_time,
      price,
      population,
      description,
      eventPrivate,
      ageRange,
      host_id,
      event_id
    )
    .then(() => {
      res.redirect("/myevents");
    });
});

//gets an event by id
router.get("/event/:id", (req, res) => {
  eventQuery.getEventById(req.params.id).then((response) => {
    res.json(response);
  });
});

//delete event by id
router.post("/event/:id", (req, res) => {
  eventQuery.deleteEvent(req.params.id).then(() => {
    res.redirect("/");
  });
});

//gets all events for a user
router.get("/events/user", (req, res) => {
  eventQuery.getAllUserOwnedEvents(req.session.user_id).then((response) => {
    res.json(response);
  });
});

//Users Route
router.get("/user/:id", (req, res) => {
  userQuery.getUserById(req.params.id).then((response) => {
    res.json(response);
  });
});

//set state to true if cookie.session
router.get("/logged_in", (req, res) => {
  if (req.session.user_id) {
    userQuery.getUserById(req.session.user_id).then((response) => {
      response.logged_in = true;
      res.json(response);
    });
  } else {
    res.json({ logged_in: false });
  }
});

//Add an event request to the database
router.post("/event/:id/request", (req, res) => {
  eventQuery.getAllTest().then((data) => {
    for (const element of data) {
      if (
        element.user_id == req.session.user_id &&
        element.events_id == req.params.id
      ) {
        res.send("You can only request once!");
        return null;
      }
    }
    eventQuery.addEventRequest(req.session.user_id, req.params.id, null);
  });
  // eventQuery.addEventRequest(req.session.user_id, req.params.id, null);
});

router.post("/event/:id/join", (req, res) => {
  eventQuery.addEventRequest(req.session.user_id, req.params.id, true);
});

router.post("/requested/:id", (req, res) => {
  eventQuery.acceptRequest(req.params.id).then((r) => r);
});

//for host declining an event from other user
router.post("/declined/:id", (req, res) => {
  eventQuery.declineRequest(req.params.id).then((r) => r);
});
router.get("/events/user/accepted", (req, res) => {
  eventQuery.getAllUserAcceptedEvents(req.session.user_id).then((response) => {
    res.json(response);
  });
});

// { '{"username":"gleesakamoshood","useremail":"glee@g.com","dob":"2002-12-02T05:00:00.000Z"}': '' }

router.post("/editprofile/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const date_of_birth = req.body.dob;

  userQuery.updateUser(name, email, date_of_birth, id).then(() => {
    res.redirect("/profile");
  });
});

module.exports = router;
