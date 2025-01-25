require('dotenv').config();
const express = require('express'); 
const app = express(); 
const session = require('express-session');

app.use(express.json()); // For parsing JSON

//creating session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));
const PORT=process.env.PORT ||3000
app.set('view engine', 'ejs');

//setting up routes
const userRoutes = require('./routes/userRoute');

app.use('/',userRoutes);

app.listen(PORT , () => { 
	console.log(`Server Running on port ${PORT}`); 
});
