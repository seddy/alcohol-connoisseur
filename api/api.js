const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config()
const assert = require('assert');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa')
const PORT = process.env.PORT || 5000;
const Drink = require('./models/Drinks');

const app = new express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drinkandrate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>  {
  console.log("Mongoose is connected!")
})

const authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ["RS256"]
});

app.get('/drinks', authorizeAccessToken, (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    dbName.collection("drinks").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.get('/users', authorizeAccessToken, (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    dbName.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.get('/drinktypes', authorizeAccessToken, (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    dbName.collection("drinktypes").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.post('/postdrinktoboard', authorizeAccessToken, (req, res) => {
  const drinkToSave = new Drink(req.body);
  drinkToSave.save()
  .then(item => {
    res.send("Drink Saved To Database")
  })
  .catch(err => {
    res.status(400).send("Unable to save drink to database");
  });
})

app.patch('/editdrinkonboard/:id', authorizeAccessToken, (req, res) => {
  try {
    const id = req.params.id;
    MongoClient.connect(process.env.MONGODB_URI, async function(err, db) {
      if (err) throw err;
      const dbName = db.db("drinkandrate");
      const updateDrink = await dbName.collection("drinks").updateOne(
        { _id: ObjectId(id) },
        { $set: { date: req.body.date,
                  drinkMain: req.body.drinkMain,
                  company: req.body.company,
                  country: req.body.country,
                  ukUsa: req.body.ukUsa,
                  firstCollabCompany: req.body.firstCollabCompany,
                  firstCollabCountry: req.body.firstCollabCountry,
                  firstUkUsa: req.body.firstUkUsa,
                  secondCollabCompany: req.body.secondCollabCompany,
                  secondCollabCountry: req.body.secondCollabCountry,
                  secondUkUsa: req.body.secondUkUsa,
                  abv: req.body.abv,
                  mixerOneBrand: req.body.mixerOneBrand,
                  mixerOne: req.body.mixerOne,
                  mixerTwoBrand: req.body.mixerTwoBrand,
                  mixerTwo: req.body.mixerTwo,
                  mixerThreeBrand: req.body.mixerThreeBrand,
                  mixerThree: req.body.mixerThree,
                  mixerFourBrand: req.body.mixerFourBrand,
                  mixerFour: req.body.mixerFour,
                  mixerFiveBrand: req.body.mixerFiveBrand,
                  mixerFive: req.body.mixerFive,
                  mixerSixBrand: req.body.mixerSixBrand,
                  mixerSix: req.body.mixerSix,
                  ratingWordOne: req.body.ratingWordOne,
                  ratingWordTwo: req.body.ratingWordTwo,
                  score: req.body.score,
                  notes: req.body.notes,
                }}
      );
      res.json(updateDrink);
      db.close();
    });
  } catch (err) {
    res.json({ message: err })
  }
});

app.patch('/profilephotoupdate/:id', authorizeAccessToken, (req, res) => {
  try {
  const id = req.params.id;
  MongoClient.connect(process.env.MONGODB_URI, async function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    const updateProfilePhoto = await dbName.collection("users").updateOne(
      { _id: ObjectId(id) },
      { $set: { profilePic: req.body.profilePic }}
    );
    res.json(updateProfilePhoto);
    db.close();
  });
  } catch (err) {
    res.json({ message: err })
  }
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../fe/build'))
}

app.listen(PORT, () => console.log("Server running on port 5000!"))
