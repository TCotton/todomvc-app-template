class Helpers {

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

}
