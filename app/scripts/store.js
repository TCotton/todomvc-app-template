(function (mediator) {

	(function initialize () {

		mediator.entry = new Map();

		mediator.subscribe('todos', function ({id, title, completed = false, clear}) {

			if (clear) {
				mediator.entry.clear();
			}

			mediator.entry.set(id, {title, completed});

		/*	for (let [key, value] of mediator.entry.entries()) {

				console.log(key);
				console.log(value.title);
				console.log(value.completed);
				console.log('break');

			}*/
		});

	}());

/*	(function updateName () {

		// Publish/Broadcast the 'nameChange' event with the new data
		mediator.publish('todos', {id: 43, title: 'jdoe', completed: true}); // tim, david
		mediator.publish('todos', {id: 47, title: 'janeDoe', completed: false}); // tim, david
	}());*/

})(mediator);
