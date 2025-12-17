/**
 * Decorator Pattern Implementation
 */

/**
 * Logging Decorator
 *
 * Wraps a function to log its calls and return values.
 *
 * @param {Function} fn - Function to decorate
 * @returns {Function} Decorated function
 */
function withLogging(fn) {
  // TODO: Implement withLogging

  // Step 1: Return a new function that wraps fn

  // Step 2: Log the function name and arguments

  // Step 3: Call the original function

  // Step 4: Log the return value

  // Step 5: Return the result

  // Note: Preserve 'this' context using apply/call

  // Broken: throws error
  return function (...args) {
    console.log(`Returned function ${fn.name} with args: ${args.join(', ')}`)
    const result = fn.apply(this, args)
    console.log(`Result: ${result}`)
    return result
  }
}

/**
 * Timing Decorator
 *
 * Wraps a function to measure and log execution time.
 *
 * @param {Function} fn - Function to decorate
 * @returns {Function} Decorated function
 */
function withTiming(fn) {
  // TODO: Implement withTiming

  // Step 1: Return a new function

  // Step 2: Record start time (performance.now() or Date.now())

  // Step 3: Call original function

  // Step 4: Calculate and log duration

  // Step 5: Return result

  return function (...args) {
    const startTime = Date.now()
    const result = fn.apply(this, args)
    const duration = Date.now() - startTime
    console.log(`Function ${fn.name} execute with duration: ${duration}`)
    return result
  }
}

/**
 * Retry Decorator
 *
 * Wraps a function to retry on failure.
 *
 * @param {Function} fn - Function to decorate
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Function} Decorated function
 */
function withRetry(fn, maxRetries = 3) {
  // TODO: Implement withRetry

  // Step 1: Return a new function

  // Step 2: Track attempt count

  // Step 3: Loop up to maxRetries:
  //   - Try to call fn
  //   - On success, return result
  //   - On failure, increment attempts and continue

  // Step 4: If all retries fail, throw the last error

  return function (...args) {
    let attemptCount = 0
    let lastError

    for (attemptCount; attemptCount < maxRetries + 1; attemptCount++) {
      try {
        return fn.apply(this, args)
      }
      catch (error) {
        lastError = error
      }
    }

    throw lastError
  }
}

/**
 * Memoize Decorator
 *
 * Wraps a function to cache results based on arguments.
 *
 * @param {Function} fn - Function to decorate
 * @returns {Function} Decorated function with cache
 */
function withMemoize(fn) {
  // TODO: Implement withMemoize

  // Similar to memoization assignment but as a decorator

  const cache = new Map()

  return function (...args) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

/**
 * Validation Decorator
 *
 * Wraps a function to validate arguments before calling.
 *
 * @param {Function} fn - Function to decorate
 * @param {Function} validator - Validation function (returns boolean)
 * @returns {Function} Decorated function
 */
function withValidation(fn, validator) {
  // TODO: Implement withValidation

  // Step 1: Return a new function

  // Step 2: Call validator with arguments

  // Step 3: If validation fails, throw error

  // Step 4: If passes, call original function

  return function (...args) {
    if (!validator(...args)) {
      throw new Error(`Function is invalid!`)
    }

    return fn.apply(this, args)
  }
}

/**
 * Cache Object Method Decorator
 *
 * Decorates an object method to cache its results.
 *
 * @param {Object} obj - Object containing the method
 * @param {string} methodName - Name of method to cache
 * @returns {Object} Object with cached method
 */
function withCache(obj, methodName) {
  // TODO: Implement withCache

  // Step 1: Get the original method

  const original = obj[methodName]

  // Step 2: Create a cache (Map)

  const cache = new Map()

  // Step 3: Replace the method with a caching wrapper

  obj[methodName] = function (...args) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = original.apply(this, args)
    cache.set(key, result)
    return cache.get(key)
  }

  // Step 4: Return the object

  // Broken: deletes the method instead of caching it
  return obj;
}

/**
 * Compose Decorators
 *
 * Composes multiple decorators into one.
 * Decorators are applied right-to-left.
 *
 * @param {...Function} decorators - Decorator functions
 * @returns {Function} Composed decorator
 */
function compose(...decorators) {
  // TODO: Implement compose

  // Return a function that takes fn and applies all decorators

  // Example: compose(a, b, c)(fn) = a(b(c(fn)))

  return (fn) => {
    return decorators.reduceRight((acc, decorator) => decorator(acc), fn)
  };
}

/**
 * Pipe Decorators
 *
 * Like compose but applies left-to-right.
 *
 * @param {...Function} decorators - Decorator functions
 * @returns {Function} Piped decorator
 */
function pipe(...decorators) {
  // TODO: Implement pipe

  // Same as compose but left-to-right

  return (fn) => {
    return decorators.reduce((acc, decorator) => decorator(acc), fn);
  };
}

// Storage for logs (used in tests)
const logs = [];

function log(message) {
  logs.push(message);
  // console.log(message); // Uncomment for debugging
}

function clearLogs() {
  logs.length = 0;
}

function getLogs() {
  return [...logs];
}

module.exports = {
  withLogging,
  withTiming,
  withRetry,
  withMemoize,
  withValidation,
  withCache,
  compose,
  pipe,
  log,
  clearLogs,
  getLogs,
};
