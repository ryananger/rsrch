const mongoose = require('mongoose');
const url = process.env.MONGODB;
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.set('strictQuery', true);
mongoose.connect(url, options, function(a) {
  console.log('Connected to mongoDB.');
});

const resultSchema = new mongoose.Schema({
  createdOn: {type: Date, default: Date.now},
  version:   {type: String, default: '0.00'},

  answers: Object,
  totals:  Object,
  selfID:  Object
});

const infoSchema = new mongoose.Schema({
  version: {type: String, default: '0.00'},

  resultCount: Number,
  yAutism:     Object,
  nAutism:     Object,
  uAutism:     Object
});

const Result = new mongoose.model('Result', resultSchema);
const Info   = new mongoose.model('Info', infoSchema);

var models = {
  Result: Result,
  Info: Info
};

module.exports = models;