Object.prototype.deepDup = function(){
  let newObj = new this.constructor();
  
  for (let [key, val] of Object.entries(this)){
    newObj[key] = (val instanceof Object) ? val.deepDup() : val;
  }

  return newObj;
}

Object.prototype.shallowEqual = function(obj){

  if (
    typeof this !== typeof obj ||
    this.constructor !== obj.constructor ||
    Object.getPrototypeOf(this) !== Object.getPrototypeOf(obj) ||
    Object.keys(this).length !== Object.keys(obj).length
  ) return false;

  for (let [key, val] of Object.entries(this)){
    let val2 = obj[key];

    if (val instanceof Object){
      if (!(val2 instanceof Object) || !val.shallowEqual(val2)){ return false; }
    } else {
      if (val2 instanceof Object || val !== val2){ return false; }
    }
  }

  return true;
}

export default {};