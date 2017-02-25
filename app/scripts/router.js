(function (Router) {

	const home = function () { console.log('home'); };
	const completed = function () { console.log('completed'); };
	const active = function () { console.log('active'); };

	const routes = {
		'/': home,
		completed,
		active
	};

	const router = Router(routes);

	router.init();

})(Router);
