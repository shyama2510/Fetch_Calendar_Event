const { accessToken_var, refreshToken_var } = require("../passport");
const tokenManager = require("./tokenController");
const { google } = require("googleapis");
const path = require("path");
let accessToken, refreshToken;
function paramsSet(accessToken_var,refreshToken_var){
  accessToken = accessToken_var;
  refreshToken = refreshToken_var;
}

const loadAuth = (req, res) => {
    res.render('auth');
}
const successGoogleLogin = (req, res) => {
  if (!req.user) {
    res.redirect("/failure");
  } else {
    console.log(req.user);
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px;">
        <h1 style="color: #4CAF50;">Welcome, ${req.user.displayName}!</h1>
        <p style="font-size: 18px;">You have successfully logged in with Google.</p>
        <div style="margin: 20px;">
          <a href='/events' style="text-decoration: none; padding: 10px 20px; background-color: #007BFF; color: white; border-radius: 5px; font-size: 16px;">View Events</a>
        </div>
        <div style="margin: 20px;">
          <a href='/logout' style="text-decoration: none; padding: 10px 20px; background-color: #FF5733; color: white; border-radius: 5px; font-size: 16px;">Logout</a>
        </div>
      </div>
    `);
  }
};


const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}


const getEventFrontend = async(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "front.html"));
}

const getEvents = async(req,res)=>{
    console.log("token"+accessToken)
    console.log(refreshToken)
    if (!accessToken || !refreshToken) {
     res.send("User not authenticated or tokens not available.");
  }
  else{
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      try {
        const events = await tokenManager.listEvents(oauth2Client);
        if (events.length === 0) {
          res.send("No events found.");
        } else {
          res.json(events);
          
        }
      } catch (error) {
        res.send(`Error fetching events: ${error.message}`);
      }
    }
  
};

module.exports = {
  loadAuth,
  successGoogleLogin,
  failureGoogleLogin,
  getEvents,
  paramsSet,
  getEventFrontend,
};



