(function (mediator) {

	console.dir(this);

	(function initialize () {

		mediator.todosData = new Map();

		mediator.subscribe('todos', function ({id, title, completed = false, clear}) {

			if (clear) {
				mediator.todosData.clear();
			}

			mediator.todosData.set(id, {title, completed});
			/*
			 for (let [key, value] of mediator.todosData.entries()) {

			 console.log(key);
			 console.log(value.title);
			 console.log(value.completed);
			 console.log('break');

			 }*/
		});

		/*	mediator.redosData = new Map();

		 mediator.subscribe('redos', function ({id, title, clear}) {

		 if (clear) {
		 mediator.redosData.clear();
		 }

		 mediator.redosData.set(id, {title});

		 for (let [key, value] of mediator.redosData.entries()) {

		 console.log(key);
		 console.log(value.title);
		 console.log('break');

		 }
		 });*/

	}());

	/*	(function updateName () {

	 // Publish/Broadcast the 'nameChange' event with the new data
	 mediator.publish('todos', {id: 43, title: 'jdoe', completed: true}); // tim, david
	 mediator.publish('todos', {id: 47, title: 'janeDoe', completed: false}); // tim, david

	 mediator.publish('redos', {id: 43, title: 'jdoe'}); // tim, david
	 mediator.publish('redos', {id: 47, title: 'janeDoe'}); // tim, david
	 }());*/

})(mediator);
