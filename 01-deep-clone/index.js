/**
 * Deep Clone Implementation
 *
 * Create a deep copy of any JavaScript value, including nested objects,
 * arrays, and special types like Date, RegExp, Map, and Set.
 *
 * @param {*} value - The value to clone
 * @param {WeakMap} [visited] - WeakMap to track circular references (used internally)
 * @returns {*} A deep clone of the input value
 */
function deepClone(value, visited = new WeakMap()) {
  // TODO: Implement deep cloning

  // Step 1: Handle primitives (return as-is)
  // Primitives: null, undefined, number, string, boolean, symbol, bigint

  if (value === null || typeof value !== 'object') {
    return value
  }

  // Step 2: Check for circular references using the visited WeakMap
  // If we've seen this object before, return the cached clone

  if (visited.has(value)) {
    return visited.get(value)
  }

  // Step 3: Handle Date objects
  // Create a new Date with the same time value

  if (value instanceof Date) {
    const sameTime = new Date(value.getTime())
    visited.set(value, sameTime)
    return sameTime
  }

  // Step 4: Handle RegExp objects
  // Create a new RegExp with the same source and flags

  if (value instanceof RegExp) {
    const newRegExp = new RegExp(value.source, value.flags)
    visited.set(value, newRegExp)
    return newRegExp
  }

  // Step 5: Handle Map objects
  // Create a new Map and deep clone each key-value pair

  if (value instanceof Map) {
    const newMap = new Map()
    visited.set(value, newMap)
    for (const [key, val] of value) {
      newMap.set(deepClone(key, visited), deepClone(val, visited))
    }

    return newMap
  }

  // Step 6: Handle Set objects
  // Create a new Set and deep clone each value

  if (value instanceof Set) {
    const newSet = new Set()
    visited.set(value, newSet)
    for (const val of value) {
      newSet.add(deepClone(val, visited))
    }

    return newSet
  }

  // Step 7: Handle Arrays
  // Create a new array and deep clone each element

  if (Array.isArray(value)) {
    const newArr = []
    visited.set(value, newArr)

    for (let i = 0; i < value.length; i++) {
      newArr[i] = deepClone(value[i], visited)
    }

    return newArr
  }

  // Step 8: Handle plain Objects
  // Create a new object and deep clone each property

  const newObj = {}
  visited.set(value, newObj)

  for (const key in value) {
    newObj[key] = deepClone(value[key], visited)
  }

  return newObj
}

module.exports = { deepClone };
