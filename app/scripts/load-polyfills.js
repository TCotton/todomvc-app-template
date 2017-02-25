(function (Modernizr) {

	Modernizr.addTest('domshadow', function () {
		return !!document.head.attachShadow;
	});

	Modernizr.addTest('customElements', function () {
		return !!window.customElements;
	});

	function loadScript(src) {
		return new Promise(function(resolve, reject) {
			const script = document.createElement('script');
			script.async = true;
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

// Lazy load the polyfill if necessary.
	if (!Modernizr.domshadow) {
		loadScript('https://c79c1c93b0f25c307fcc-36c27361a8fd0c41e6433f2373919198.ssl.cf3.rackcdn.com/shadydom.js')
			.then(e => loadScript('https://c79c1c93b0f25c307fcc-36c27361a8fd0c41e6433f2373919198.ssl.cf3.rackcdn.com/shadycss.js'))
			.then(() => {
				return true;
			});
	}

	if (!Modernizr.customElements) {
		loadScript('//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.1.1/document-register-element.js')
			.then(() => {
				return true;
			});
	}

	if (!Modernizr.htmlimports) {
		loadScript('https://e2a932ff6bd7e6ab5050-36c27361a8fd0c41e6433f2373919198.ssl.cf3.rackcdn.com/html_imports.js')
			.then(() => {
				return true;
			});
	}


}(Modernizr));
