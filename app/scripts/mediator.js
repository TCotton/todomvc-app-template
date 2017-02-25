const mediator = ((() => {

	// Subscribe to an event, supply a callback to be executed
	// when that event is broadcast
	const subscribe = function (channel, fn) {

		if (!mediator.channels[channel]) mediator.channels[channel] = [];
		mediator.channels[channel].push({context: this, callback: fn});
		return this;
	};

	// Publish/broadcast an event to the rest of the application
	const publish = function (channel, ...args) {
		if (!mediator.channels[channel]) return false;

		for (let value of mediator.channels[channel]) {
			const subscription = value;
			subscription.callback.apply(subscription.context, args);
		}
		return this;
	};

	return {
		channels: {},
		publish,
		subscribe,
		installTo(obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
})());
