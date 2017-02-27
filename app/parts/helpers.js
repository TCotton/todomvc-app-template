class Helpers {

  /**
   * @description helper method that stringifies a map
   * @param map {Map}
   * @return {string}
   */
  static mapToJson(map) {
    return JSON.stringify([...map]);
  }

  /**
   * @description helper method that parse a string and creates map
   * @param jsonStr {string}
   * @returns {Map}
   */
  static jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
  }

  static createNode(html) {
    return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
  }

  /**
   * Encode less-than and ampersand characters with entity codes to make user-
   * provided text safe to parse as HTML.
   *
   * @param {string} s String to escape
   *
   * @returns {string} String with unsafe characters escaped with entity codes
   */

  static escapeForHTML(s) {
    return s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');
  }

  /**
   *
   * @param str {string} to escape
   * @returns {XML|string}
   */

  static htmlEscape(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   *
   * @param str {string} to unescape
   * @returns {XML|string}
   */

  static htmlUnescape(str) {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  /**
   * @description find nodeType based on
   * @param node {object}
   * @returns {*}
   */

  static findParent(node) {

    if (Object.is(node.nodeType, 1)) {

      if (node.parentElement.hasAttribute('data-id') && Object.is(node.parentElement.tagName, 'LI')) {
        return node.parentElement;
      }

      return this.findParent(node.parentElement);

    }

  }

}

APP.Helpers = Helpers;
