import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//Add event form
export default function Addevent(props) {
  const url = "/api/events/";
  return (
    <form method="POST" className="add-event-form" action={url}>
      <p>Event name:</p>
      <input
        name="name"
        required
        placeholder="Enter event name"
        value="HIHIHI"
      ></input>
      <p>Date of the event:</p>
      <input
        required
        name="date"
        placeholder="YYYY-MM-DD"
        value="2001-05-25"
      ></input>

      <p>Address</p>
      <input
        name="address"
        required
        placeholder="Enter address"
        value="address123"
      ></input>

      <p>Start time:</p>
      <input
        name="start_time"
        required
        placeholder="YYYY-MM-DD hr:min:sec"
        value="2001-04-04 10:10:00"
      ></input>

      <p>End time:</p>
      <input
        name="end_time"
        required
        placeholder="YYYY-MM-DD hr:min:sec"
        value="2001-04-04 10:10:00"
      ></input>

      <p>Price</p>
      <input required name="price" placeholder="Enter price"></input>

      <p>description: </p>
      <input
        required
        name="description"
        placeholder="Describe ya event"
        value="very fun"
      ></input>

      <p>is it private?</p>
      <input
        required
        name="eventPrivate"
        placeholder="Enter true or false"
        value="true"
      ></input>

      <p>age range: </p>
      <input
        required
        name="agerange"
        placeholder="enter the age range"
        value="19-25"
      ></input>

      <button type="submit" className="input-btn">
        Add Event
      </button>
    </form>
  );
}
