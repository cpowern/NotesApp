require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Top level funtion / Port name
const app = express();
const port = 8000 || process.env.PORT;

// enables to handle incoming requests with URL-encoded or JSON-encoded payloads, making it easier to work with data sent from clients.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));

// templating Enige
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

// Routes --> server/routes/index.js
app.use('/', require('./server/routes/index'));

// Handle 404 responses
app.get('*', function(req, res) {
    res.status(404).send('404 Not Found. Please lern how to type correctly');	
})

// Port setzten
app.listen(port, () => {
    console.log(`App listening in port ${port}`);
})