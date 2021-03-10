Array.prototype.uniq = function () {
  return [...new Set(this)]
}

// console.log([1, 2, 2, 3, 3, 3].uniq())

// Array.prototype._twosum = function () {
//   let map = new Map()

//   for (let i = 0, length = this.length; i < length; i++) {
//     let el = this[i];

//     if (el >= 0) {   //hash[el] = true
//       map.set(el, true)
//     }

//     if (el < 0 && map.get(-el)) {
//       map.set(-el, el)
//     }
//   }

//   return [...map].filter(el => el[1] !== true)
// }

Array.prototype.twosum = function(){
  const result = [];
  const self = this;
  
  this.forEach(callback);

  function callback(el, i){ // el === this[i]
    for (let j = self.length - 1; j > i; --j){
      if ( el + self[j] === 0 ) result.push([i, j]);
    }
  };

  return result;
}

// console.log([1, 2, -2, 3, 3, -4, -3].twosum());

// [ [a, b, c],
//   [d, e, f],
//   [g, h, i],
// ]

// [ [a, d, g],
//   [b, e, h],
//   [c, f, i],
// ]

Array.prototype.transpose = function(){
  const rows = this.length;
  const cols = this[0].length;
  const res = new Array(cols)
                .fill(true)
                .map(() => []);

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      res[j][i] = this[i][j]

  return res;
}

Array.prototype._transpose = function(){
  const rows = this.length;
  const cols = this[0].length;

  const result = new Array(cols)
                  .fill(true)
                  .map(() => []);

  const callback = (el, i) => {
    for (let j = 0; j < cols; j++)
    for (let j = cols - 1; j >= 0; --j ){
      result[j][i] = this[i][j];
    }
  }

  this.forEach(callback);

  return result;
}

console.log([[1,2,3,4],[4,5,6,7]].transpose())

// Array#twoSum - returns an array of position pairs where the elements sum to zero