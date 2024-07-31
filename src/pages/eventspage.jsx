// Fetching Events // 

import { useState, useEffect } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

// For Displaying Event Details // 

const EventCard = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} />
      <p>{event.description}</p>
      <p>{event.startTime} - {event.endTime}</p>
      <p>Categories: {event.categories.join(", ")}</p>
    </div>
  );
};

// Making the Items Clickable //

import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`}>
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} />
      <p>{event.description}</p>
      <p>{event.startTime} - {event.endTime}</p>
      <p>Categories: {event.categories.join(", ")}</p>
    </Link>
  );
};

// Showing Event Details //

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <img src={event.image} alt={event.title} />
      <p>{event.description}</p>
      <p>{event.startTime} - {event.endTime}</p>
      <p>Categories: {event.categories.join(", ")}</p>
      <p>Created by: {event.createdBy.name}</p>
      <img src={event.createdBy.image} alt={event.createdBy.name} />
    </div>
  );
};

// Form for Adding or Editing Events // 

const EventForm = ({ event, onSave }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [image, setImage] = useState(event?.image || "");
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");
  const [categories, setCategories] = useState(event?.categories || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, description, image, startTime, endTime, categories };
    onSave(newEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

// Adding Events//

const addEvent = (newEvent) => {
  fetch("http://localhost:3000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent),
  })
  .then(response => response.json())
  .then(data => console.log("Event added:", data))
  .catch(error => console.error("Error adding event:", error));
};

// Editing Event //

const updateEvent = (updatedEvent) => {
  fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent),
  })
  .then(response => response.json())
  .then(data => console.log("Event updated:", data))
  .catch(error => console.error("Error updating event:", error));
};

// Deleting Events //

const deleteEvent = (id) => {
  if (window.confirm("Are you sure you want to delete this event?")) {
    fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(() => {
      console.log("Event deleted");
      // Redirect to EventsPage
    })
    .catch(error => console.error("Error deleting event:", error));
  }
};

// Searching for Events //

const [searchTerm, setSearchTerm] = useState("");

const filteredEvents = events.filter(event =>
  event.title.toLowerCase().includes(searchTerm.toLowerCase())
);

// Filtering Events by Category //

const [selectedCategory, setSelectedCategory] = useState("");

const filteredEvents = events.filter(event =>
  selectedCategory ? event.categories.includes(selectedCategory) : true
);

