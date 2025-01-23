# Google Authentication and Calendar Event Viewer

This project enables users to log in using Google Authentication and view their Google Calendar events. The events are displayed in a table format, and users can filter events by date. The application uses *EJS* for server-side rendering and leverages Google APIs for authentication and fetching calendar events.

---

## Features

- *Google Authentication*:
  - Secure login using OAuth 2.0.
- *Google Calendar Integration*:
  - Fetch events from the user's Google Calendar.
  - Display events in a table with filtering options based on date.
- *Server-Side Rendering*:
  - Events and user data are rendered dynamically using EJS templates.

---

## Prerequisites

- *Node.js* installed. [Download Node.js](https://nodejs.org/)
- *Google Cloud Platform (GCP)* account to set up OAuth credentials.

---

## Getting Started

## 1. Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/shyama2510/Fetch_Calendar_Event.git


## 2. Install Dependencies

npm i

## 3. Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

1. SESSION_SECRET="SECRET_HERE"
2. CLIENT_ID=YOUR CLIENT_ID
3. CLIENT_SECRET=YOUR CLIENT_SECRET

## 4. Start the project

npm start
