/**
 * Command Pattern Implementation
 */

/**
 * Command Manager
 *
 * Manages command execution with undo/redo support.
 */
class CommandManager {
  constructor() {
    // TODO: Initialize stacks
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * Execute a command
   * @param {Object} command - Command with execute() method
   */
  execute(command) {
    // TODO: Implement execute
    // Step 1: Call command.execute()

    command.execute()

    // Step 2: Push to undo stack

    this.undoStack.push(command)

    // Step 3: Clear redo stack (new action invalidates redo history)

    this.redoStack = []

  }

  /**
   * Undo the last command
   * @returns {boolean} Whether undo was performed
   */
  undo() {
    // TODO: Implement undo

    // Step 1: Check if undo stack is empty

    if (this.undoStack.length === 0) {
      return false
    }

    // Step 2: Pop command from undo stack

    const command = this.undoStack.pop()

    // Step 3: Call command.undo()

    command.undo()

    // Step 4: Push to redo stack

    this.redoStack.push(command)

    // Step 5: Return true

    return true
  }

  /**
   * Redo the last undone command
   * @returns {boolean} Whether redo was performed
   */
  redo() {
    // TODO: Implement redo

    // Step 1: Check if redo stack is empty

    if (this.redoStack.length === 0) {
      return false
    }

    // Step 2: Pop command from redo stack

    const command = this.redoStack.pop()

    // Step 3: Call command.execute()

    command.execute()

    // Step 4: Push to undo stack

    this.undoStack.push(command)

    // Step 5: Return true

    return true
  }

  /**
   * Check if undo is available
   * @returns {boolean}
   */
  canUndo() {
    // TODO: Return whether undo stack has items
    return this.undoStack.length > 0
  }

  /**
   * Check if redo is available
   * @returns {boolean}
   */
  canRedo() {
    // TODO: Return whether redo stack has items
    return this.redoStack.length > 0
  }

  /**
   * Get command history (executed commands)
   * @returns {Object[]}
   */
  get history() {
    // TODO: Return copy of undo stack
    return [...this.undoStack]
  }

  /**
   * Clear all history
   */
  clear() {
    // TODO: Clear both stacks
    this.redoStack = []
    this.undoStack = []
  }
}

/**
 * Add Command
 */
class AddCommand {
  constructor(calculator, value) {
    // TODO: Store calculator and value
    this.calculator = calculator;
    this.value = value;
    this.description = `Add ${value}`;
  }

  execute() {
    // TODO: Add value to calculator.value
    this.calculator.value += this.value
  }

  undo() {
    // TODO: Subtract value from calculator.value
    this.calculator.value -= this.value
  }
}

/**
 * Subtract Command
 */
class SubtractCommand {
  constructor(calculator, value) {
    // TODO: Store calculator and value
    this.calculator = calculator;
    this.value = value;
    this.description = `Subtract ${value}`;
  }

  execute() {
    // TODO: Subtract value from calculator.value
    this.calculator.value -= this.value
  }

  undo() {
    // TODO: Add value to calculator.value
    this.calculator.value += this.value
  }
}

/**
 * Multiply Command
 */
class MultiplyCommand {
  constructor(calculator, value) {
    // TODO: Store calculator, value, and previous value for undo
    this.calculator = calculator;
    this.value = value;
    this.previous_value = null
    this.description = `Multiply by ${value}`;

  }

  execute() {
    // TODO: Multiply calculator.value by value
    // Save previous value for undo
    this.previous_value = this.calculator.value
    this.calculator.value *= this.value
  }

  undo() {
    // TODO: Restore previous value
    this.calculator.value = this.previous_value
  }
}

/**
 * Divide Command
 */
class DivideCommand {
  constructor(calculator, value) {
    // TODO: Store calculator, value, and previous value for undo
    this.calculator = calculator;
    this.value = value;
    this.previous_value = null
    this.description = `Divide by ${value}`;
  }

  execute() {
    // TODO: Divide calculator.value by value
    // Save previous value for undo
    this.previous_value = this.calculator.value
    this.calculator.value /= this.value
  }

  undo() {
    // TODO: Restore previous value
    this.calculator.value = this.previous_value
  }
}

/**
 * Macro Command (Composite)
 *
 * Groups multiple commands into one.
 */
class MacroCommand {
  constructor(commands = []) {
    // TODO: Store commands array
    this.commands = commands;
    this.description = "Macro";
  }

  /**
   * Add a command to the macro
   * @param {Object} command
   */
  add(command) {
    // TODO: Add command to array
    this.commands.push(command)
  }

  execute() {
    // TODO: Execute all commands in order
    this.commands.forEach(com => {
      com.execute()
    });
  }

  undo() {
    // TODO: Undo all commands in reverse order
    this.commands.reverse().forEach(com => {
      com.undo()
    })
  }
}

/**
 * Set Value Command
 *
 * Sets calculator to specific value (useful for testing).
 */
class SetValueCommand {
  constructor(calculator, value) {
    // TODO: Store calculator, new value, and previous value
    this.calculator = calculator;
    this.value = value;
    this.previous_value = null
    this.description = `Set to ${value}`;
  }

  execute() {
    // TODO: Save previous, set new value
    this.previous_value = this.calculator.value
    this.calculator.value = this.value
  }

  undo() {
    // TODO: Restore previous value
    this.calculator.value = this.previous_value
  }
}

module.exports = {
  CommandManager,
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  MacroCommand,
  SetValueCommand,
};
