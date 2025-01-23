const express = require('express');
const router = express();
const passport = require('passport');
require('../passport');

router.use(passport.initialize()); 
router.use(passport.session());

const userController = require('../controllers/userController');

router.get('/', userController.loadAuth);


// Auth Callback 
router.get( '/auth/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/success', 
		failureRedirect: '/failure'
}));
router.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/");
  });
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
    accessType: "offline", // Request a refresh token
    prompt: "consent", // Force consent screen to get a refresh token
  })
);

// Success 
router.get('/success' , userController.successGoogleLogin); 

// failure 
router.get('/failure' , userController.failureGoogleLogin);

router.get('/events',userController.getEventFrontend);
router.get("/api/events", userController.getEvents);

module.exports = router;