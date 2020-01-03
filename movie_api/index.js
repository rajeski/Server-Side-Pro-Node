// Import Express

const express = require('express');

const morgan = require('morgan');

// Create New Express App

const app = express();

// Server Configuration 

// const PORT = 8080; 

var topMovies = [
    {
      title: 'Rashomon',
      genre: 'crime drama',
      director: 'akira kurosawa', 
      main_actor: 'toshiro mifune', 
      country: 'japan', 
      year: 1950
    },
    {
      title: 'Tokyo Story',
      genre: 'drama',
      director: 'yasujiro ozu',
      main_actor: 'chishu ryu',
      country: 'japan',
      year: 1953 
    },
    {
      title: 'Godzilla (Gojira)', 
      genre: 'tokusatsu (special filming) protest-movie',
      director: 'ishiro honda',
      main_actor: 'haruo nakajima',
      country: 'japan',
      year: 1954 
    },
    {
      title: 'Paths of Glory',
      genre: 'anti-war',
      director: 'stanley kubrick',
      main_actor: 'kirk douglas',
      country: 'germany',
      year: 1957
    },
    {
      title: 'Spartacus',
      genre: 'epic historical drama',
      director: 'stanley kubrick',
      main_actor: 'kirk douglas',
      country: 'america and spain',
      year: 1960
    },
    {
      title: '2001: A Space Odyssey',
      genre: 'epic science fiction',
      director: 'stanley kubrick',
      main_actor: 'keir dullea',
      country: 'england',
      year: 1968
    },
    {
      title: 'Chinatown',
      genre: 'neo-noir mystery',
      director: 'roman polanski',
      main_actor: 'jack nicholson',
      country: 'america',
      year: 1974
    },
    {
      title: 'Gallipoli',
      genre: 'war drama',
      director: 'peter weir',
      main_actor: 'mel gibson',
      country: 'australia',
      year: 1981
    },
    {
      title: 'Bound',
      genre: 'neo-noir crime',
      director: 'the wachowskis',
      main_actor: 'gina gershon',
      country: 'america',
      year: 1996
    },
    {
      title: 'Ronin',
      genre: 'action thriller',
      director: 'john frankenheimer',
      main_actor: 'robert deniro',
      country: 'france',
      year: 1998
    },
  ];
  
  // Morgan middleware library - log all terminal requests 
  app.use(morgan('common'));
  
  // To serve static file(s) - public folder
  app.use(express.static('public'));
  
  // Middleware error-handling function - log application-level errors to terminal
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('An error occured');
  });
  
  // GET request
  app.get('/', function(req, res) {
    var responseText =
      'Welcome to the My Flicks Movie App. Herein you can find detailed information about movies.';
    res.send(responseText);
  });

  app.get('/movies', function(req, res) {
  res.json(topMovies);
  });

  app.get('/genre', function(req, res) {
    var responseText =
      'You've made it to the genre endpoint';
    res.send(responseText);
  });

  app.get('/title', function(req, res) {
    var responseText =
      'You've made it to the genre endpoint';
    res.send(responseText);
  });

  app.get('/year', function(req, res) {
    var responseText =
      'You've made it to the genre endpoint';
    res.send(responseText);
  });

  app.get('/director', function(req, res) {
    var responseText =
      'You've made it to the genre endpoint';
    res.send(responseText);
  });

  app.use((err, req, res, next) => {
    var logEntryTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var logEntry = `${logEntryTimestamp} - Error: ${err.stack}`;
    console.error(logEntry);
    res.status(500).send('Please Stand By!');
  });
  
  // Listen for requests
  app.listen(8080, function() {
    console.log('Your app is listening on port 8080');
  });