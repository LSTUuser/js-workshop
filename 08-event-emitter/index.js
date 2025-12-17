/**
 * Event Emitter Implementation
 *
 * A pub/sub event system similar to Node.js EventEmitter.
 */
class EventEmitter {
  constructor() {
    // TODO: Initialize event storage
    this.events = new Map(); // or {}
  }

  /**
   * Register a listener for an event
   * @param {string} event - Event name
   * @param {Function} listener - Callback function
   * @returns {EventEmitter} this (for chaining)
   */
  on(event, listener) {
    // TODO: Implement on

    // Step 1: Get or create the listeners array for this event

    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    // Step 2: Add the listener to the array

    const listeners = this.events.get(event)
    listeners.push(listener)

    // Step 3: Return this for chaining

    return this; // Broken: should return this
  }

  /**
   * Remove a specific listener for an event
   * @param {string} event - Event name
   * @param {Function} listener - Callback to remove
   * @returns {EventEmitter} this (for chaining)
   */
  off(event, listener) {
    // TODO: Implement off
    // Step 1: Get the listeners array for this event

    const listeners = this.events.get(event)

    if (!listeners) {
      return this
    }

    // Step 2: Find and remove the listener
    // Note: Handle wrapped 'once' listeners

    for (let i = 0; i < listeners.length; i++) {
      const currentListener = listeners[i]

      if (currentListener === listener ||
        (currentListener.listener && currentListener.listener === listener)) {
        listeners.splice(i, 1)
        break
      }
    }

    if (listeners.length === 0) {
      this.events.delete(event)
    }

    // Step 3: Return this for chaining

    return this;
  }

  /**
   * Emit an event, calling all registered listeners
   * @param {string} event - Event name
   * @param {...*} args - Arguments to pass to listeners
   * @returns {boolean} true if event had listeners
   */
  emit(event, ...args) {
    // TODO: Implement emit

    // Step 1: Get the listeners array for this event

    const listeners = this.events.get(event)

    // Step 2: If no listeners, return false

    if (!listeners || listeners.length === 0) {
      return false
    }

    // Step 3: Call each listener with the arguments
    // Make a copy of the array to handle removals during emit

    const listenersCopy = listeners.slice()

    for (const listener of listenersCopy) {
      if (typeof listener === 'function') {
        listener.apply(this, args)
      } else if (listener && typeof listener.wrappedListener === 'function') {
        listener.wrappedListener.apply(this, args)
      }
    }

    // Step 4: Return true

    return true;
  }

  /**
   * Register a one-time listener
   * @param {string} event - Event name
   * @param {Function} listener - Callback function
   * @returns {EventEmitter} this (for chaining)
   */
  once(event, listener) {
    // TODO: Implement once

    // Step 1: Create a wrapper function that:
    //   - Removes itself after being called
    //   - Calls the original listener with arguments

    const onceWrapper = (...args) => {
      const listeners = this.events.get(event)
      if (listeners) {
        const index = listeners.indexOf(onceWrapper)
        if (index !== -1) {
          listeners.splice(index, 1)
        }
      }

      listener.apply(this, args)
    };

    // Step 2: Store reference to original listener for 'off' to work

    // Step 3: Register the wrapper with 'on'

    onceWrapper.listener = listener

    this.on(event, onceWrapper)

    // Step 4: Return this for chaining

    return this; // Broken: should return this
  }

  /**
   * Remove all listeners for an event (or all events)
   * @param {string} [event] - Event name (optional)
   * @returns {EventEmitter} this (for chaining)
   */
  removeAllListeners(event) {
    // TODO: Implement removeAllListeners

    // If event is provided, remove only that event's listeners
    // If no event, clear all events

    if (event) {
      this.events.delete(event)
    } else {
      this.events.clear()
    }

    return this; // Broken: should return this
  }

  /**
   * Get array of listeners for an event
   * @param {string} event - Event name
   * @returns {Function[]} Array of listener functions
   */
  listeners(event) {
    // TODO: Implement listeners

    // Return copy of listeners array, or empty array if none

    const listeners = this.events.get(event)
    if (!listeners) return []

    return listeners.slice();
  }

  /**
   * Get number of listeners for an event
   * @param {string} event - Event name
   * @returns {number} Listener count
   */
  listenerCount(event) {
    // TODO: Implement listenerCount

    const listeners = this.events.get(event)
    return listeners ? listeners.length : 0
  }
}

module.exports = { EventEmitter };
