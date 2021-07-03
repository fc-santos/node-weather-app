const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');

// Weather function helpers
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.listen(port, () => console.log('Server started on port ' + port));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Filipe',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Filipe',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'This is some helpful text',
    name: 'Filipe',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({
      error: 'You must provide an address',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.status(404).send({ error: error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.status(404).send({error: error});
      }

      res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
      })
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Page Not Found',
    helpText: 'Help article not found',
    name: 'Filipe',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Page Not Found',
    helpText: 'The page you requested was not found.',
    name: 'Filipe',
  });
});
