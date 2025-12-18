/**
 * Strategy Pattern Implementation
 */

// ============================================
// SORTING STRATEGIES
// ============================================

/**
 * Sort Context
 *
 * Delegates sorting to a strategy.
 */
class SortContext {
  constructor(strategy) {
    // TODO: Store strategy
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    // TODO: Update strategy
    this.strategy = strategy
  }

  sort(array) {
    // TODO: Delegate to strategy
    // Return sorted copy, don't mutate original
    return this.strategy.sort([...array])
  }
}

/**
 * Bubble Sort Strategy
 */
class BubbleSort {
  sort(array) {
    // TODO: Implement bubble sort
    // Return new sorted array

    if (array.length <= 1) {
      return [...array]
    }

    const copy = [...array]
    const copyLength = copy.length

    for (let i = 0; i < copyLength - 1; i++) {
      for (let j = 0; j < copyLength - 1 - i; j++) {
        if (copy[j] > copy[j + 1]) {
          [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]]
        }
      }
    }

    return copy; // Broken: Replace with implementation
  }
}

/**
 * Quick Sort Strategy
 */
class QuickSort {
  sort(array) {
    // TODO: Implement quick sort
    // Return new sorted array

    if (array.length <= 1) {
      return [...array]
    }

    const current = array[0]
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      if (array[i] < current) left.push(array[i]);
      else right.push(array[i]);
    }

    const res = [...this.sort(left), current, ...this.sort(right)]

    return res; // Broken: Replace with implementation
  }
}

/**
 * Merge Sort Strategy
 */
class MergeSort {
  sort(array) {
    // TODO: Implement merge sort
    // Return new sorted array
    if (array.length <= 1) {
      return [...array]
    }

    const mid = Math.floor(array.length / 2);
    const left = this.sort(array.slice(0, mid));
    const right = this.sort(array.slice(mid));

    return this.merge(left, right);
  }

  merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  }
}

// ============================================
// PRICING STRATEGIES
// ============================================

/**
 * Pricing Context
 *
 * Calculates prices using a strategy.
 */
class PricingContext {
  constructor(strategy) {
    // TODO: Store strategy
    this.strategy = strategy
  }

  setStrategy(strategy) {
    // TODO: Update strategy
    this.strategy = strategy
  }

  calculateTotal(items) {
    // TODO: Delegate to strategy
    return this.strategy.calculate(items)
  }
}

/**
 * Regular Pricing (no discount)
 */
class RegularPricing {
  calculate(items) {
    // TODO: Sum all item prices
    let sum = 0
    items.forEach(item => sum += item.price)
    return sum
  }
}

/**
 * Percentage Discount
 */
class PercentageDiscount {
  constructor(percentage) {
    // TODO: Store percentage (0-100)
    this.percentage = percentage;
  }

  calculate(items) {
    // TODO: Apply percentage discount
    let total = 0

    items.forEach(item => total += item.price)

    return total * (1 - this.percentage / 100)
  }
}

/**
 * Fixed Discount
 */
class FixedDiscount {
  constructor(amount) {
    // TODO: Store fixed discount amount
    this.amount = amount;
  }

  calculate(items) {
    // TODO: Subtract fixed amount from total
    // Don't go below 0
    let total = 0

    items.forEach(item => total += item.price)

    return Math.max(0, total - this.amount);
  }
}

/**
 * Buy One Get One Free
 */
class BuyOneGetOneFree {
  calculate(items) {
    // TODO: Every second item is free
    // Sort by price desc, charge only every other item
    const sorted = [...items].sort((a, b) => b.price - a.price)

    let total = 0

    for (let i = 0; i < sorted.length; i++) {
      if (i % 2 === 0) {
        total += sorted[i].price
      }
    }

    return total
  }
}

/**
 * Tiered Discount
 *
 * Different discount based on total.
 */
class TieredDiscount {
  constructor(tiers) {
    // TODO: Store tiers
    tiers = [{ threshold: 100, discount: 10 }, { threshold: 200, discount: 20 }]
    this.tiers = tiers;
  }

  calculate(items) {
    // TODO: Apply tier discount based on subtotal
    let total = 0

    items.forEach(item => {
      total += item.price
    })

    for (const tier of this.tiers) {
      if (total >= tier.threshold) {
        return total * (1 - tier.discount / 100)
      }
    }

    return total
  }
}

// ============================================
// VALIDATION STRATEGIES
// ============================================

/**
 * Validation Context
 */
class ValidationContext {
  constructor(strategy) {
    // TODO: Store strategy
    this.strategy = strategy
  }

  setStrategy(strategy) {
    // TODO: Update strategy
    this.strategy = strategy
  }

  validate(data) {
    // TODO: Delegate to strategy
    return this.strategy.validate(data);
  }
}

/**
 * Strict Validation
 *
 * Requires all three fields to be present and valid:
 * - name: must be a non-empty string
 * - email: must be a non-empty string (no regex validation required)
 * - age: must be a number (any number is valid, no range check required)
 */
class StrictValidation {
  validate(data) {
    // TODO: Validate that name, email, and age are all present and valid
    // Return { valid: boolean, errors: string[] }
    // Example: { valid: false, errors: ["Name is required", "Email is required"] }
    const errors = []

    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push("Name is required")
    }

    if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
      errors.push("Email is required")
    }

    if (data.age === undefined || typeof data.age !== 'number') {
      errors.push("Age must be a number")
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

/**
 * Lenient Validation
 *
 * Accepts any data, including empty objects.
 * No validation rules - always passes.
 */
class LenientValidation {
  validate(data) {
    // TODO: Always return valid: true, errors: []
    // This strategy has no validation rules
    return { valid: true, errors: [] }; // Broken: Replace with implementation
  }
}

// ============================================
// STRATEGY REGISTRY
// ============================================

/**
 * Strategy Registry
 *
 * Register and retrieve strategies by name.
 */
class StrategyRegistry {
  constructor() {
    // TODO: Initialize registry map
    this.strategies = new Map();
  }

  register(name, strategy) {
    // TODO: Store strategy by name
    this.strategies.set(name, strategy)
  }

  get(name) {
    // TODO: Return strategy by name
    return this.strategies.get(name) || null
  }

  has(name) {
    // TODO: Check if strategy exists
    return this.strategies.has(name)
  }
}

module.exports = {
  // Sorting
  SortContext,
  BubbleSort,
  QuickSort,
  MergeSort,
  // Pricing
  PricingContext,
  RegularPricing,
  PercentageDiscount,
  FixedDiscount,
  BuyOneGetOneFree,
  TieredDiscount,
  // Validation
  ValidationContext,
  StrictValidation,
  LenientValidation,
  // Registry
  StrategyRegistry,
};
