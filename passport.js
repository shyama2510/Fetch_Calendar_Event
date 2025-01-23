require("dotenv").config();
const passport = require("passport");
const { setTokens } = require("./config/authconfig");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { paramsSet } = require('./controllers/userController')

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID, // Your Credentials here.
      clientSecret: process.env.CLIENT_SECRET, // Your Credentials here.
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
		console.log(accessToken);
		console.log(refreshToken);
	  paramsSet(accessToken,refreshToken)
      return done(null, profile);
    }
  )
);


