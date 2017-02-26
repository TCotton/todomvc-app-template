APP.mediator = ((() => {

  /**
   * @description Subscribe to an event, supply a callback to be executed when that event is broadcast
   * @param store {string}
   * @param fn {function}
   * @returns {subscribe} {object}
   */
  const subscribe = function (store, fn) {

    if (!APP.mediator.stores[store]) {
      APP.mediator.stores[store] = [];
    }

    APP.mediator.stores[store].push({ context: this, callback: fn });

    return this;
  };

  /**
   * @description Publish/broadcast an event to the rest of the application
   * @param store {string}
   * @param args {object}
   * @returns {*||boolean}
   */
  const publish = function (store, ...args) {

    if (!APP.mediator.stores[store]) {
      return false;
    }

    for (let value of APP.mediator.stores[store]) {
      const subscription = value;
      subscription.callback.apply(subscription.context, args);
    }

    return this;
  };

  return {
    stores: {},
    publish,
    subscribe
  };
})());