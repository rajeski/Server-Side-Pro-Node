// Require Mongoose

const mongoose = require('mongoose');
const Models = require('./models.js'); 

const Movies = Models.Movie; 
const Users = Models.User; 

mongoose.connect('mongodb://localhost:27017/MyFlicksDB', {useNewUrlParser: true}); 

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
      genre: 'drama / mystery',
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
      genre: 'neo-noir crime thriller',
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
  
var addUser = [
  {
    "username" : "genericman", 
    "password" : "generic123",
    "email" : "generic@man.com",
    "date_of_birth" : "1984-05-01"
  }, 
];

var updateUser = [
  {
    "username" : "genericwoman", 
    "password" : "generic456",
    "email" : "generic@woman.com",
    "date_of_birth" : "1989-03-01"
  }, 
];

var removeUser = [
  {
    "username" : "genericman", 
    "password" : "generic123",
    "email" : "generic@man.com",
    "date_of_birth" : "1984-05-01"
  }, 
];

var addMovie = [
  {
    title: 'Winged Migration',
    genre: 'nature tail',
    director: 'jacques perrin, jacques cluzard, michael debats',
    main_actor: 'birds',
    country: 'world',
    year: 2003
  }, 
];

var removeMovie = [
  {
    title: 'Winged Migration',
    genre: 'nature tail',
    director: 'jacques perrin, jacques cluzard, michael debats',
    main_actor: 'birds',
    country: 'world',
    year: 2003
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
  
// POST users request 

// CREATE Add a User
/* We'll expect JSON in this format
{
  ID : Integer,
  Username : String, 
  Password : String, 
  Email : String, 
  Birthday : Date
}*/

app.post('/users', function(req, res) {
  Users.findOne( {Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists"); 
    } else {
      Users 
      .create({
        Username: req.body.Username, 
        Password: req.body.Password, 
        Email: req.body.Email, 
        Birthday: req.body.Birthday  
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }   
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error : + error");
  });
});

// PUT users request 

// UPDATE user's info, by username
/* We'll expect JSON in this format
{
  Username: String,
  (required)
  Password: String, 
  (required)
  Email: String,
  (required)
  Birthday: Data
}*/

app.put('/users', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, // Return updated document 
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});

// POST Add movie, user's favorites' list 
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true }, // Return updated document 
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// READ GET top movies

// app.get('/topMovies', function(req, res) {

//   Users.find()
//   .then(function(users) {
//     res.status(201).json(users)
//   })
//   .catch(function(err) {
//     console.error(err);
//     res.status(500).send("Error: " + err);
//   });
// });

// READ GET genres

app.get('/genre', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// READ GET title

app.get('/title', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});
   
// READ GET year

app.get('/year', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// READ GET director

app.get('/director', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// READ GET main actor

app.get('/main_actor', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// READ GET country

app.get('/country', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// READ GET all users

app.get('/users', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// READ Get a user by username 
app.get('/users/:Username', function(req, res) {
  Users.findOne( {Username : req.params.Username })
  .then(function(users) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// DELETE request 

// Delete user by username
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
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