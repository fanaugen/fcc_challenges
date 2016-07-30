function makeFibonacciIterator() {
  let [prev, curr] = [0, 1];
  
  return {
    next: function() {
      [prev, curr] = [curr, prev + curr];
      return prev;
    }
  };    
}

var fibMaker = makeFibonacciIterator();

// print the first 20 Fibonacci numbers
console.clear();
for (let fib of (new Array(20))) {
  console.log(fibMaker.next().value);
}
