const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const axios    = require('axios');
const {Result, Info} = require('./db.js');

var controller = {
  addResult: function(req, res) {
    Result.create(req.body)
      .then(function(result) {
        controller.updateData(fixDoc(result), res);
      })
  },
  updateData: async function(result, res) {
    const current = await Info.findOne({version: result.version});

    const update = function(info) {
      info.resultCount++;

      switch (result.selfID.autism) {
        case 'yes':
          info.yAutism.count++;
          info.yAutism.scoreTotals += result.totals.all;
          break;
        case 'no':
          info.nAutism.count++;
          info.nAutism.scoreTotals += result.totals.all;
          break;
        case 'unknown':
          info.uAutism.count++;
          info.uAutism.scoreTotals += result.totals.all;
          break;
      }
    };

    if (!current) {
      var newInfo = {
        version: result.version,
        resultCount: 0,
        yAutism: {count: 0, scoreTotals: 0},
        nAutism: {count: 0, scoreTotals: 0},
        uAutism: {count: 0, scoreTotals: 0}
      };

      update(newInfo);

      Info.create(newInfo)
        .then(function(info) {
          res.send({result, newInfo});
        })
    } else {
      update(current);

      Info.findOneAndUpdate({version: current.version}, current, {new: true})
        .then(function(info) {
          res.send({result, info: fixDoc(info)});
        })
    }
  },
  getData: async function(req, res) {
    var infos   = await Info.find({});
    var results = await Result.find({});

    infos = infos.map(function(doc) {return fixDoc(doc)});
    results = results.map(function(doc) {return fixDoc(doc)});

    res.send({infos, results});
  },
  fix: function(req, res) {
    Result.deleteMany({})
      .then(function(result){
        console.log(result);
      })

    Info.deleteMany({})
      .then(function(result) {
        console.log(result);
      })

    res.send('yay');
  }
};

var fixDoc = function(doc) {
  var ret = doc.toJSON();

  delete ret._id;
  delete ret.__v;

  return ret;
};

module.exports = controller;