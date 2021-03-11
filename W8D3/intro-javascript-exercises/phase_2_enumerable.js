Array.prototype.myEach = function(callback, thisArg=this){
  // thisArg ||= this
  for( let i = 0; i < this.length; i++)
    callback.call(thisArg, this[i], i, this); 
};

// [1, 2, 3].myEach(el => console.log(el))


// Array.prototype.myEach = function (callback, thisArg = this) { for (let i = 0; i < this.length; i++) { callback.call(thisArg, this[i], i, this) } };
// [1,2,3].myEach(el => console.log(el))


Array.prototype.myMap = function (callback, thisArg = this) {
  const result = [];
  for (let i = 0; i < this.length; i++)
    result.push(callback.call(thisArg, this[i], i, this));
  return result;
};

// console.log([1, 2, 3].myMap((el,i) => el * i))

// const arr = [1,2,3]

// arr.myEach( function(el,i,a) {
//   this[i] = "a".repeat(el)
// },arr);

// console.log(arr);

// arr.myEach(function (el, i, a) {
//   a[i] = "a".repeat(el)
// },);

// console.log(arr)

Array.prototype.myReduce = function(callback, initialValue){
  let acc = initialValue;
  let i = 0;

  // if (acc === undefined){
  //   acc = this[0];

  //   for (let i = 1; i < this.length; i++){
  //     acc = callback(acc, this[i]);
  //   }
  // } else {
  //   for (let i = 0; i < this.length; i++){
  //     acc = callback(acc, this[i]);
  //   }
  // }

  if (acc === undefined){
    acc = this[0];
    i = 1;
  }

  for (; i < this.length; i++)
    acc = callback(acc, this[i]);
  

  return acc;
};

// console.log( [1,2,3,4,5].myReduce((acc, el)=> acc * el) );