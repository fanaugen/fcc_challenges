function makeFibonacciIterator() {
  var prev = 0,
      curr = 1,
      fibo;

  return {
    next: function() {
      fibo = prev + curr;
      prev = curr;
      curr = fibo;
      return prev;
    }
  };
}

function makeOddFibonacciIterator() {
  var fibonacci = makeFibonacciIterator();

  return {
    next: function() {
      var fib;
      while(true) {
        fib = fibonacci.next();
        if (fib % 2 > 0) return fib; // number is odd
      }
    }
  }
}

function sumFibs(upperBound) {
  var oddFib = makeOddFibonacciIterator(),
      sum    = 0,
      fib;

  while (true) {
    fib = oddFib.next();
    if (fib > upperBound) return sum;
    sum += fib;
  }
}

console.log(sumFibs(4000000)); // should return 4613732
