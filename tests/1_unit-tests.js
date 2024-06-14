const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("Test 1-1 : whole number input", function() {
        let input = "33km"
        assert.equal(convertHandler.getNum(input), 33);
    }),
    test("Test 1-2 : decimal number input", function() {
        let input = "33.33km"
        assert.equal(convertHandler.getNum(input), 33.33);
    }),
    test("Test 1-3 : fractional input", function() {
        let input = "33/2km"
        assert.equal(convertHandler.getNum(input), "33/2");
    }),
    test("Test 1-4 : fractional input with a decimal", function() {
        let input = "33.3/2km"
        assert.equal(convertHandler.getNum(input), "33.3/2");
    }),
    test("Test 1-5 : error on a double-fraction", function() {
        let input = "33/2/3km"
        assert.equal(convertHandler.getNum(input), undefined);
    }),
    test("Test 1-6 : default to a numerical input", function() {
        let input = "km"
        assert.equal(convertHandler.getNum(input), 1);
    }),
    test("Test 1-7 : valid input unit", function() {
        let input = "33km"
        assert.equal(convertHandler.getUnit(input), 'km');
    }),
    test("Test 1-8 : error for an invalid input unit", function() {
        let input = "33kmss"
        assert.equal(convertHandler.getReturnUnit(input), undefined);
    }),
    test("Test 1-9 : correct return unit for each valid input unit", function() {
        let inputUnit = ["gal", "L", "mi", "km", "lbs", "kg" ]
        let outputUnit = ["L", "gal", "km", "mi", "kg", "lbs" ]

        for (let i = 0; i < inputUnit.length; i++) {
            assert.equal(convertHandler.getReturnUnit(inputUnit[i]), outputUnit[i]);
        }
    }),
    test("Test 1-10 : return the spelled-out string unit for each valid input unit", function() {
        let unit = ["gal", "L", "mi", "km", "lbs", "kg" ]
        let spelledUnit = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms" ]

        for (let i = 0; i < unit.length; i++) {
            assert.equal(convertHandler.spellOutUnit(unit[i]), spelledUnit[i]);
        }
    }),
    test("Test 1-11 : correctly convert gal to L", function() {
        let initNum = 1
        let initUnit = "gal"
        assert.approximately(convertHandler.convert(initNum, initUnit), 3.78541, 0.1);
    }),
    test("Test 1-12 : correctly convert L to gal", function() {
        let initNum = 1
        let initUnit = "L"
        assert.approximately(convertHandler.convert(initNum, initUnit), 1/3.78541, 0.1);
    }),
    test("Test 1-13 : correctly convert mi to km", function() {
        let initNum = 1
        let initUnit = "mi"
        assert.approximately(convertHandler.convert(initNum, initUnit), 1.60934, 0.1);
    }),
    test("Test 1-14 : correctly convert km to mi", function() {
        let initNum = 1
        let initUnit = "km"
        assert.approximately(convertHandler.convert(initNum, initUnit), 1/1.60934, 0.1);
    }),
    test("Test 1-15 : correctly convert lbs to kg", function() {
        let initNum = 1
        let initUnit = "lbs"
        assert.approximately(convertHandler.convert(initNum, initUnit), 0.453592, 0.1);
    }),
    test("Test 1-16 : correctly convert kg to lbs", function() {
        let initNum = 1
        let initUnit = "kg"
        assert.approximately(convertHandler.convert(initNum, initUnit), 1/0.453592, 0.1);
    })
});