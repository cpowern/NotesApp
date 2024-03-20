require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')

// Top level funtion / Port name
const app = express();
const port = 8000 || process.env.PORT;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// enables to handle incoming requests with URL-encoded or JSON-encoded payloads, making it easier to work with data sent from clients.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to Database
connectDB();

// Static Files
app.use(express.static('public'));

// templating Enige
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404 responses
app.get('*', function(req, res) {
    res.status(404).render('404');	
})

// Port setzten
app.listen(port, () => {
    console.log(`App listening in port ${port}`);
})
//d