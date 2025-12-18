/**
 * State Machine Implementation
 */
class StateMachine {
  /**
   * Create a state machine
   * @param {Object} config - Machine configuration
   * @param {string} config.initial - Initial state
   * @param {Object} config.states - State definitions
   * @param {Object} [config.context] - Initial context data
   */
  constructor(config) {
    // TODO: Implement constructor
    // Step 1: Validate config has initial and states

    if (!config.initial || !config.states) {
      throw new Error(`Initial or state not found`)
    }

    // Step 2: Store configuration
    this.config = config;
    this.currentState = config.initial;
    this.context = config.context || {};
    // Step 3: Validate initial state exists in states

    if (!config.states[config.initial]) {
      throw new Error(`Initial state doesn't exist in states`)
    }

  }

  /**
   * Get current state
   * @returns {string}
   */
  get state() {
    // TODO: Return current state
    return this.currentState
  }

  /**
   * Attempt a state transition
   * @param {string} event - Event name
   * @param {Object} [payload] - Optional data for the transition
   * @returns {boolean} Whether transition was successful
   */
  transition(event, payload) {
    // TODO: Implement transition

    // Step 1: Get current state config

    const currentStateCfg = this.config.states[this.currentState]

    // Step 2: Check if event is valid for current state
    // Return false if not

    if (!currentStateCfg.on || !currentStateCfg.on[event]) {
      return false
    }

    // Step 3: Get transition config (can be string or object)
    // If string: target = transition
    // If object: { target, guard, action }

    const transitionCfg = currentStateCfg.on[event]

    let target, guard, action
    if (typeof transitionCfg === 'string') {
      target = transitionCfg
    } else {
      target = transitionCfg.target
      guard = transitionCfg.guard
      action = transitionCfg.action
    }

    // Step 4: Check guard if present
    // If guard returns false, return false

    if (guard && !guard(this.context, payload)) {
      return false
    }

    // Step 5: Update state to target

    this.currentState = target

    // Step 6: Call action if present

    if (action) {
      action(this.context, payload)
    }

    // Step 7: Return true

    return true
  }

  /**
   * Check if a transition is possible
   * @param {string} event - Event name
   * @returns {boolean}
   */
  can(event) {
    // TODO: Implement can

    // Check if event exists for current state
    // Check guard if present

    const currentStateCfg = this.config.states[this.currentState]

    if (!currentStateCfg.on || !currentStateCfg.on[event]) {
      return false
    }

    const transitionCfg = currentStateCfg.on[event]
    const guard = typeof transitionCfg === 'object' ? transitionCfg.guard : null

    if (guard) {
      return guard(this.context)
    }

    return true

  }

  /**
   * Get available transitions from current state
   * @returns {string[]} Array of event names
   */
  getAvailableTransitions() {
    // TODO: Implement getAvailableTransitions

    // Return array of event names from current state's 'on' config

    const currentStateCfg = this.config.states[this.currentState]

    if (!currentStateCfg.on) {
      return []
    }

    return Object.keys(currentStateCfg.on)
  }

  /**
   * Get the context data
   * @returns {Object}
   */
  getContext() {
    // TODO: Return context
    return { ...this.context }
  }

  /**
   * Update context data
   * @param {Object|Function} updater - New context or updater function
   */
  updateContext(updater) {
    // TODO: Implement updateContext
    // If updater is function: this.context = updater(this.context)
    // If updater is object: merge with existing context

    if (typeof updater === 'function') {
      this.context = updater(this.context)
    } else {
      this.context = { ...this.context, ...updater }
    }
  }

  /**
   * Check if machine is in a final state (no transitions out)
   * @returns {boolean}
   */
  isFinal() {
    // TODO: Check if current state has no transitions
    const currentStateCfg = this.config.states[this.currentState]
    return !currentStateCfg.on || Object.keys(currentStateCfg.on).length === 0
  }

  /**
   * Reset machine to initial state
   * @param {Object} [newContext] - Optional new context
   */
  reset(newContext) {
    // TODO: Reset to initial state
    // Optionally reset context

    this.currentState = this.config.initial
    if (newContext !== undefined) {
      this.context = newContext
    }
  }
}

/**
 * Create a state machine factory
 *
 * @param {Object} config - Machine configuration
 * @returns {Function} Factory function that creates machines
 */
function createMachine(config) {
  // TODO: Implement createMachine

  // Return a function that creates new StateMachine instances
  // with the given config

  return () => new StateMachine(config);
}

module.exports = { StateMachine, createMachine };
