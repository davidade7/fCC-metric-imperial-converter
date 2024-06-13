'use strict';

const expect = require('chai').expect;
const { application } = require('express');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    // console.log(req.query)
    let inputNum = convertHandler.getNum(req.query.input)
    let inputUnit = convertHandler.getUnit(req.query.input)
    let outputUnit = convertHandler.getReturnUnit(inputUnit)
    
    if (inputNum === undefined && (inputUnit === undefined || outputUnit === undefined)) {
      return res.json({error: 'invalid number and unit'})
    } else if (inputNum === undefined) {
      return res.json({error: 'invalid number'})
    } else if (inputUnit === undefined || outputUnit === undefined) {
      return res.json({error: 'invalid unit'})
    } 
      
    let convertNum = convertHandler.convert(inputNum, inputUnit).toFixed(5)
    return res.json({
      initNum: eval(inputNum),
      initUnit: inputUnit,
      returnNum: Number(convertNum),
      returnUnit: outputUnit,
      string: convertHandler.getString(inputNum, inputUnit, convertNum, outputUnit)
    })
  })
};
