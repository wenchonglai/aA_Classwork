Array.prototype.bubbleSort = function(callback = (a, b) => a === b ? 0 : ( a < b ? -1 : 1)){
  const result = [...this];
  let sorted = false;

  while (sorted = !sorted)
    for (let i = 1; i < result.length; i++)
      if ( callback(result[i - 1], result[i]) > 0 )
        [ sorted, result[i], result[i - 1] ] = [ false, result[i - 1], result[i] ];

  return result;
}

console.log([3,1,4,1,5,9,2,6].bubbleSort());

console.log([3,-1,4,-1,5,-9,2,6].bubbleSort( (a, b) => Math.abs(a) - Math.abs(b) ));

console.log([3,-1,4,-1,5,-9,2,6].sort( (a, b) => Math.abs(a) - Math.abs(b) ));