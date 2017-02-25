const mediator = ((() => {

	// Subscribe to an event, supply a callback to be executed
	// when that event is broadcast
	const subscribe = function (store, fn) {

		if (!mediator.stores[store]) {
			mediator.stores[store] = [];
		}

		mediator.stores[store].push({context: this, callback: fn});

		return this;
	};

	// Publish/broadcast an event to the rest of the application
	const publish = function (store, ...args) {

		if (!mediator.stores[store]) {
			return false;
		}

		for (let value of mediator.stores[store]) {
			const subscription = value;
			subscription.callback.apply(subscription.context, args);
		}

		return this;
	};

	return {
		stores: {},
		publish,
		subscribe,
		installTo(obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
})());
