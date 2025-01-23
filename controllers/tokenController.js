
const { google } = require("googleapis");

async function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  let allEvents = [];
  let pageToken;

  try {
    do {
      const response = await calendar.events.list({
        calendarId: "primary", // Primary calendar of the authenticated user
        maxResults: 2500, // Maximum number of events per request (Google allows up to 2500)
        singleEvents: true, // Expand recurring events into individual events
        orderBy: "startTime", // Order events by start time
        pageToken: pageToken, // Token to handle paginated results
      });

      allEvents = allEvents.concat(response.data.items); // Accumulate events
      pageToken = response.data.nextPageToken; // Update the token for the next page (if available)
    } while (pageToken); // Continue fetching if there's more data

    return allEvents;
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
}

module.exports={
    listEvents
}
