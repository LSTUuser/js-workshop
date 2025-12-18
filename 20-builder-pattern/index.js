/**
 * Builder Pattern Implementation
 */

/**
 * Query Builder
 *
 * Builds SQL-like query strings.
 */
class QueryBuilder {
  constructor() {
    // TODO: Initialize state
    this.selectCols = [];
    this.fromTable = null;
    this.whereClauses = [];
    this.orderByClauses = [];
    this.limitCount = null;
  }

  /**
   * Select columns
   * @param {...string} columns - Column names
   * @returns {QueryBuilder} this
   */
  select(...columns) {
    // TODO: Store columns
    this.selectCols = columns
    return this
  }

  /**
   * From table
   * @param {string} table - Table name
   * @returns {QueryBuilder} this
   */
  from(table) {
    // TODO: Store table name
    this.fromTable = table
    return this
  }

  /**
   * Add where clause
   * @param {string} column - Column name
   * @param {string} operator - Comparison operator
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} this
   */
  where(column, operator, value) {
    // TODO: Store where clause
    this.whereClauses.push({ column, operator, value })
    return this
  }

  /**
   * Add order by clause
   * @param {string} column - Column to order by
   * @param {string} [direction='ASC'] - ASC or DESC
   * @returns {QueryBuilder} this
   */
  orderBy(column, direction = "ASC") {
    // TODO: Store order by clause
    this.orderByClauses.push({ column, direction })
    return this
  }

  /**
   * Set limit
   * @param {number} count - Maximum rows
   * @returns {QueryBuilder} this
   */
  limit(count) {
    // TODO: Store limit
    this.limitCount = count
    return this
  }

  /**
   * Build the query string
   * @returns {string} SQL query string
   */
  build() {
    // TODO: Build and return query string
    // Format: SELECT cols FROM table WHERE clauses ORDER BY clause LIMIT n
    let query = `SELECT ${this.selectCols.join(', ')} FROM ${this.fromTable}`

    if (this.whereClauses.length > 0) {
      const whereStr = this.whereClauses
        .map(w => {
          const value = typeof w.value === 'string' ? `'${w.value}'` : w.value
          return `${w.column} ${w.operator} ${value}`
        })
        .join(' AND ')
      query += ` WHERE ${whereStr}`
    }

    if (this.orderByClauses.length > 0) {
      const orderStr = this.orderByClauses
        .map(o => `${o.column} ${o.direction}`)
        .join(', ')
      query += ` ORDER BY ${orderStr}`
    }

    if (this.limitCount > 0) {
      query += ` LIMIT ${this.limitCount}`
    }

    return query
  }

  /**
   * Reset builder state
   * @returns {QueryBuilder} this
   */
  reset() {
    // TODO: Reset all state
    this.selectCols = [];
    this.fromTable = null;
    this.whereClauses = [];
    this.orderByClauses = [];
    this.limitCount = null;
    return this;
  }
}

/**
 * HTML Builder
 *
 * Builds HTML element strings.
 */
class HTMLBuilder {
  constructor() {
    // TODO: Initialize state
    this.tagName = 'div';
    this.idAttr = null;
    this.classes = [];
    this.attributes = {};
    this.innerContent = '';
    this.children = [];
  }

  /**
   * Set tag name
   * @param {string} name - HTML tag name
   * @returns {HTMLBuilder} this
   */
  tag(name) {
    // TODO: Store tag name
    this.tagName = name
    return this
  }

  /**
   * Set id attribute
   * @param {string} id - Element ID
   * @returns {HTMLBuilder} this
   */
  id(id) {
    // TODO: Store id
    this.idAttr = id
    return this
  }

  /**
   * Add classes
   * @param {...string} classNames - Class names to add
   * @returns {HTMLBuilder} this
   */
  class(...classNames) {
    // TODO: Store classes
    this.classes.push(...classNames)
    return this
  }

  /**
   * Add attribute
   * @param {string} name - Attribute name
   * @param {string} value - Attribute value
   * @returns {HTMLBuilder} this
   */
  attr(name, value) {
    // TODO: Store attribute
    this.attributes[name] = value
    return this
  }

  /**
   * Set inner content
   * @param {string} content - Text content
   * @returns {HTMLBuilder} this
   */
  content(content) {
    // TODO: Store content
    this.innerContent = content
    return this
  }

  /**
   * Add child element
   * @param {string} childHtml - Child HTML string
   * @returns {HTMLBuilder} this
   */
  child(childHtml) {
    // TODO: Store child
    this.children.push(childHtml)
    return this
  }

  /**
   * Build HTML string
   * @returns {string} HTML element string
   */
  build() {
    // TODO: Build and return HTML string
    // Format: <tag id="..." class="..." attrs>content</tag>
    let attrs = ''

    if (this.idAttr) {
      attrs += ` id="${this.idAttr}"`
    }

    if (this.classes.length > 0) {
      attrs += ` class="${this.classes.join(' ')}"`
    }

    for (const [name, value] of Object.entries(this.attributes)) {
      attrs += ` ${name}="${value}"`
    }

    let content = this.innerContent + this.children.join('')

    if (content || this.tagName === 'div' || this.tagName === 'span') {
      return `<${this.tagName}${attrs}>${content}</${this.tagName}>`
    } else {
      return `<${this.tagName}${attrs} />`
    }

  }


  /**
   * Reset builder state
   * @returns {HTMLBuilder} this
   */
  reset() {
    // TODO: Reset all state
    this.tagName = 'div';
    this.idAttr = null;
    this.classes = [];
    this.attributes = {};
    this.innerContent = '';
    this.children = [];
    return this;
  }
}

/**
 * Config Builder
 *
 * Builds configuration objects.
 */
class ConfigBuilder {
  constructor() {
    // TODO: Initialize state
    this.config = {
      environment: 'development',
      database: null,
      features: [],
      logLevel: 'info'
    };
  }

  /**
   * Set environment
   * @param {string} env - Environment name
   * @returns {ConfigBuilder} this
   */
  setEnvironment(env) {
    // TODO: Set environment
    this.config.environment = env
    return this
  }

  /**
   * Set database configuration
   * @param {Object} dbConfig - Database config object
   * @returns {ConfigBuilder} this
   */
  setDatabase(dbConfig) {
    // TODO: Set database config
    this.config.database = dbConfig
    return this
  }

  /**
   * Enable a feature
   * @param {string} feature - Feature name
   * @returns {ConfigBuilder} this
   */
  enableFeature(feature) {
    // TODO: Add feature to list
    if (!this.config.features.includes(feature)) {
      this.config.features.push(feature)
    }
    return this
  }

  /**
   * Disable a feature
   * @param {string} feature - Feature name
   * @returns {ConfigBuilder} this
   */
  disableFeature(feature) {
    // TODO: Remove feature from list
    this.config.features = this.config.features.filter(f => f !== feature)
    return this
  }

  /**
   * Set log level
   * @param {string} level - Log level
   * @returns {ConfigBuilder} this
   */
  setLogLevel(level) {
    // TODO: Set log level
    this.config.logLevel = level
    return this
  }

  /**
   * Build configuration object
   * @returns {Object} Configuration object
   */
  build() {
    // TODO: Return copy of config
    return {
      environment: this.config.environment,
      database: this.config.database,
      features: [...this.config.features],
      logLevel: this.config.logLevel,
    }
  }
}

/**
 * Request Builder
 *
 * Builds HTTP request configurations.
 */
class RequestBuilder {
  constructor(baseUrl = "") {
    // TODO: Initialize state
    this._baseUrl = baseUrl;
    this._method = 'GET';
    this._path = '';
    this._queryParams = {};
    this._headers = {};
    this._body = null;
  }

  /**
   * Set HTTP method
   * @param {string} method - GET, POST, PUT, DELETE, etc.
   * @returns {RequestBuilder} this
   */
  method(method) {
    this._method = method.toUpperCase()
    return this
  }

  /**
   * Set URL path
   * @param {string} path - URL path
   * @returns {RequestBuilder} this
   */
  path(path) {
    this._path = path
    return this
  }

  /**
   * Add query parameter
   * @param {string} key - Parameter name
   * @param {string} value - Parameter value
   * @returns {RequestBuilder} this
   */
  query(key, value) {
    this._queryParams[key] = value
    return this
  }

  /**
   * Add header
   * @param {string} key - Header name
   * @param {string} value - Header value
   * @returns {RequestBuilder} this
   */
  header(key, value) {
    this._headers[key] = value
    return this
  }

  /**
   * Set request body
   * @param {*} body - Request body
   * @returns {RequestBuilder} this
   */
  body(body) {
    this._body = body
    return this
  }

  /**
   * Build request configuration
   * @returns {Object} Request config for fetch
   */
  build() {
    // TODO: Return fetch-compatible config
    let url = this._baseUrl + this._path

    const queryStr = Object.entries(this._queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (queryStr) {
      url += `?${queryStr}`;
    }

    return {
      method: this._method,
      url,
      headers: { ...this._headers },
      body: this._body,
    };
  }
}

module.exports = {
  QueryBuilder,
  HTMLBuilder,
  ConfigBuilder,
  RequestBuilder,
};
