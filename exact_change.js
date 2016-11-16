// constructor for an object that represents available cash in drawer
function CashInDrawer(cid_data) {
  // monetary units and their values in cents, sorted descending by value
  var monetaryUnits = [ 
    {name: "ONE HUNDRED", value: 10000},
    {name: "TWENTY"     , value:  2000},
    {name: "TEN"        , value:  1000},
    {name: "FIVE"       , value:   500},
    {name: "ONE"        , value:   100},
    {name: "QUARTER"    , value:    25},
    {name: "DIME"       , value:    10},
    {name: "NICKEL"     , value:     5},
    {name: "PENNY"      , value:     1},
  ].sort(function(a,b) {
    return b.value - a.value;
  });
  
  var parseCashInDrawer = function(pairs) {     // [["PENNY", 1.23], ...]
    return pairs.reduce(function(obj, pair) {   //    ↓
      obj[pair[0]] = cents(pair[1]);            // { "PENNY": 123, ...}
      return obj;
    }, {});
  };
  
  // cid_data is in the format [["PENNY", 1.45], ...]
  // assumption: data is always valid, i.e. ["DIME", 0.05] doesn’t occur
  var cid = parseCashInDrawer(cid_data);
  var drawer = monetaryUnits.map(function(unit){
    return {
      name:   unit.name,          // "QUARTER"
      value:  unit.value,         // 25     
      amount: cid[unit.name]      // 175
    };
  });
  
  var total = function(drawer) {
    return drawer.reduce(function(sum, unit) {
      return sum + unit.amount;
    }, 0);
  };
    
  var NOT_ENOUGH_CASH = "Insufficient Funds",
      CLOSED          = "Closed";
  
  var calculateChange = function(amount, drawer) {
    var unit = drawer[0];

    // base case: pennies
    if (drawer.length === 1) {
      if (amount > unit.amount) {
        throw new NoCashException(NOT_ENOUGH_CASH);
      } else if (amount === unit.amount) {
        throw new NoCashException(CLOSED);
      } else if (amount === 0) {
        return null;        
      } else {
        return [[unit.name, dollars(amount)]];
      }
    }
    // recursive case: bigger currency unit
    else {
      var partialChange = null;
      var qty = Math.floor(amount / unit.value);
      var part = 0;
      
      if (unit.amount > 0 && qty > 0) {
        part = Math.min(unit.amount, qty * unit.value);
        partialChange = [[unit.name, dollars(part)]];
      }
      // recurse
      var rest = calculateChange(amount - part, drawer.slice(1));
      
      if (partialChange) return partialChange.concat(rest);
      else               return rest;
    }
  };
  
  this.getChange = function(amount) {
    var money = calculateChange(amount, drawer);
    return money.filter(function(elem) { return elem; });
  };
  
}

function NoCashException(message) {
  this.message = message;
}

function dollars(cents) { return cents / 100; }
function cents(dollars) { return Math.round(dollars * 100); }


function checkCashRegister(price, cash, cid) {
  var change = cents(cash) - cents(price);

  try {
    return (new CashInDrawer(cid)).getChange(change);
  } catch (e) {
    return e.message;
  }
}


// test
console.log(
  checkCashRegister(3.26, 100.00,
                    [["PENNY", 1.01],
                     ["NICKEL", 2.05],
                     ["DIME", 3.10],
                     ["QUARTER", 4.25],
                     ["ONE", 90.00],
                     ["FIVE", 55.00],
                     ["TEN", 20.00],
                     ["TWENTY", 60.00],
                     ["ONE HUNDRED", 100.00]]
                   )
);
