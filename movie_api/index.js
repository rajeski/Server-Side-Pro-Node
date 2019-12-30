const express = require('express');
const morgan = require('morgan');

const app = express();

var topMovies = [
    {
      title: 'Rashomon',
      genre: 'crime drama',
      year: 1950
    },
    {
      title: 'Tokyo Story',
      genre: 'drama',
      year: 1953
    },
    {
      title: 'Godzilla (Gojira)', 
      genre: 'tokusatsu (special filming) protest-movie',
      year: 1954 
    },
    {
      title: 'Paths of Glory',
      genre: 'anti-war',
      year: 1957
    },
    {
      title: 'Spartacus',
      genre: 'epic historical drama',
      year: 1960
    },
    {
      title: '2001: A Space Odyssey',
      genre: 'epic science fiction',
      year: 1968
    },
    {
      title: 'Chinatown',
      genre: 'neo-noir mystery',
      year: 1974
    },
    {
      title: 'Gallipoli',
      genre: 'war drama',
      year: 1981
    },
    {
      title: 'Bound',
      genre: 'neo-noir crime',
      year: 1996
    },
    {
      title: 'Ronin',
      genre: 'action thriller',
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
  
  // Listen for requests
  app.listen(8080, function() {
    console.log('Your app is listening on port 8080');
  });