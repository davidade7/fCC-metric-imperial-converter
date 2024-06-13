function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let letters = /[a-zA-Z]/i
    let unitIndex = input.search(letters)
    let potentialNum = input.slice(0, unitIndex)

    if (unitIndex === 0) {
      result = 1
    } else if (!potentialNum.match(/\//g) || potentialNum.match(/\//g).length === 1) {
      result = potentialNum
    } else {
      result = undefined
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let letters = /[a-zA-Z]/i;
    let allowedUnit = ["gal", "GAL", "l", "L", "mi", "MI", "km", "KM", "kg", "KG", "lbs", "LBS"]
    let unitIndex = input.search(letters)

    if (unitIndex < 0) {
      return undefined
    } else if (!allowedUnit.includes(input.slice(unitIndex))) {
      return undefined
    } else if (input.slice(unitIndex) == 'l' || input.slice(unitIndex) == 'L') {
      result = 'L'
    } else {
      result = input.slice(unitIndex).toLowerCase()
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch (initUnit) {
      case 'gal':
      case 'GAL':
        result = 'L'
        break;
      case 'L':
      case 'l':
        result = 'gal'
        break;
      case 'lbs':
      case 'LBS':
        result = "kg"
        break;
      case 'kg':
      case 'KG':
        result = 'lbs'
        break;
      case 'mi':
      case 'MI':
        result = 'km'
        break;
      case 'km':
      case 'KM':
        result = "mi"
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch (unit) {
      case 'gal':
        result = 'gallons'
        break;
      case 'L':
        result = 'liters'
        break;
      case 'lbs':
        result = "pounds"
        break;
      case 'kg':
        result = 'kilograms'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'km':
        result = "kilometers"
        break;
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let num = eval(initNum)

    switch (initUnit) {
      case 'gal':
        result = num * galToL
        break;
      case 'L':
        result = num / galToL
        break;
      case 'lbs':
        result = num * lbsToKg
        break;
      case 'kg':
        result = num / lbsToKg
        break;
      case 'mi':
        result = num * miToKm
        break;
      case 'km':
        result = num / miToKm
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${eval(initNum)} ${this.spellOutUnit(initUnit)} converts to ${Number(returnNum)} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
