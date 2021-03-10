Array.prototype.uniq = function () {
  return [...new Set(this)]
}

// console.log([1, 2, 2, 3, 3, 3].uniq())

Array.prototype.twosum = function () {
  let map = new Map()
  for (let i = 0, length = this.length; i < length; i++) {
    let el = this[i]
    if (el >= 0) {   //hash[el] = true
      map.set(el, true)
    }
    if (el < 0 && map.get(-el)) {
      map.set(-el, el)
    }
  }
  return [...map].filter(el => el[1] !== true)
}

console.log([1, 2, -2, 3, 3, -4].twosum())

// Array#twoSum - returns an array of position pairs where the elements sum to zero