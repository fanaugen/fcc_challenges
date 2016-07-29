function convertToRoman(num) {
  // separate decimal into ones, tens, hundreds, thousands
  var decimalDigits = decimalDigitsOf(num).reverse();
  var romanDigits   = [];

  var oneFiveTen = "IVX XLC CDM".split(" ");

  // ones, tens, hundreds
  for (var i = 0; i < 3; i++) {
    romanDigits.push(formatAsRoman(decimalDigits[i], oneFiveTen[i]));
  }

  // thousands
  if (isFinite(decimalDigits[3])) {
    romanDigits.push(repeat(decimalDigits[3], "M"));
  }

  return romanDigits.reverse().join("");
}

function formatAsRoman(num, romanLetters) {
  var one  = romanLetters[0],
      five = romanLetters[1],
      ten  = romanLetters[2];

  if      (num <  4) return repeat(num, one);
  else if (num == 4) return one  + five;
  else if (num <  9) return five + repeat(num - 5, one);
  else if (num == 9) return one  + ten;
}


function repeat(times, char) {
  return (new Array(times)).fill(char).join("");
}

function decimalDigitsOf(num) {
  var digit = num % 10;
  if (num == digit) return [digit];
  return decimalDigitsOf((num - digit) / 10).concat(digit);
}

console.log(convertToRoman(12)); // prints XII
