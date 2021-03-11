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

const arr = [1,2,3]

// arr.myEach( function(el,i,a) {
//   this[i] = "a".repeat(el)
// },arr);

// console.log(arr);

arr.myEach(function (el, i, a) {
  a[i] = "a".repeat(el)
},);

console.log(arr)