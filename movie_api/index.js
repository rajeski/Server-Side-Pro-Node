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

// Morgan middleware library - log all terminal requests 
app.use(morgan('common'));
  
// To serve static file(s) - public folder
app.use(express.static('public'));
  
// Middleware error-handling function - log application-level errors to terminal
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('An error occured');
});
  
// POST new users registration 

// (Example)

// https://localhost:27017/MyFlicksDB/users/?Username=Bob&Password=BobsPassword&Email=blah@blah.com&Birthday=23/03/1990

app.post('/users', function(req, res) {
  Users.findOne({
    Username: req.body.Username
  })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// PUT users update request 

app.put('/users/:Username', function(req, res) {
  Users.update(
    {
      Username: req.params.Username
    },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    {
      new: true
    }, // Return updated information 
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// POST Add movie, user's favorites' list 
app.post('/users/:Username/FavoriteMovies/:MovieID', function(req, res) {
  const { Username, MovieID } = req.params;
  Users.findOneAndUpdate(
    {
      Username: Username
    },
    {
      $push: {
        FavoriteMovies: MovieID
      }
    },
    {
      new: true
    }, // Return updated information 
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete('/users/:Username/FavoriteMovies/:MovieID', function(req, res) {
  const { Username, MovieID } = req.params;
  console.log(Username, MovieID);
  Users.findOneAndUpdate(
    // Update request
    {
      Username: Username
    },
    {
      $pull: {
        FavoriteMovies: MovieID
      }
    },
    {
      new: true
    }, // // Return updated information 
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

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

// DELETE 

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