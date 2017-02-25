(function (win) {

	win.helpers = {};

	helpers.createNode = html => new DOMParser().parseFromString(html, 'text/html').body.firstChild;

	Object.freeze(helpers);

})(window);
