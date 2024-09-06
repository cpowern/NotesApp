// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the Express framework
const express = require('express');

// Import express-ejs-layouts for easy layout management in Express
const expressLayouts = require('express-ejs-layouts');

// Import method-override middleware for handling HTTP methods such as PUT and DELETE
const methodOverride = require('method-override');

// Import the database connection function from the specified path, handelded in the config>db.js
const connectDB = require('./server/config/db');

// To start a session and keep the user logged in
const session = require('express-session');

// Import the Passport.js library for authentication
const passport = require('passport');

// Import the connect-mongo middleware for storing session data in MongoDB
const MongoStore = require('connect-mongo');

// Top level funtion / Port name
const app = express();

// Define port
const port = 8000 || process.env.PORT;

// Configure session middleware with options
app.use(session({
  secret: 'keyboard cat', // Secret used to sign the session ID cookie
  resave: false, // Prevents session from being saved to the store on every request
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  store: MongoStore.create({ // Configure session store using connect-mongo
    mongoUrl: process.env.MONGODB_URI // MongoDB connection URI obtained from environment variables
  })
}));

// Initialize Passport middleware
app.use(passport.initialize());

// Use Passport session middleware for persistent login sessions
app.use(passport.session());

// Override the HTTP method with the value specified in the '_method' query parameter
app.use(methodOverride("_method"));

// Parse incoming request bodies in URL-encoded or JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the MongoDB database
connectDB();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use express-ejs-layouts for layout management
app.use(expressLayouts);

// Set the default layout file for rendering views
app.set('layout', './layouts/main');

// Set the view engine to EJS (Embedded JavaScript)
app.set('view engine', 'ejs');

// Define routes for different parts of the application
app.use('/', require('./server/routes/index')); // Home page and other generic routes
app.use('/', require('./server/routes/auth')); // Authentication routes
app.use('/', require('./server/routes/dashboard')); // Dashboard routes

// Handle 404 responses by rendering a custom 404 page
app.get('*', function(req, res) {
    res.status(404).render('404');	
})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`App listening in port ${port}`);
})