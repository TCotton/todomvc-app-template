(((window, mediator) => {

  const mapToJson = (map) => {
    return JSON.stringify([...map]);
  };

  const jsonToMap = (jsonStr) => {
    return new Map(JSON.parse(jsonStr));
  };

  (function setLocalStorageDefault() {

    /**
     * @type {Storage}
     */
    const localStorage = window.localStorage;

    if (!localStorage.getItem('todo')) {

      const todosData = new Map();
      const dummyData = { id: Date.now(), title: 'Bake a JavaScript cake', completed: false };
      todosData.set(dummyData.id, { title, completed } = dummyData);
      localStorage.setItem('todo', mapToJson(todosData));

    }

  }());

  /**
   *
   */

  (function initialize() {

    mediator.todosData = jsonToMap(localStorage.getItem('todo')) || new Map();

    mediator.subscribe('todos', function ({ id, title, completed = false, clear }) {

      if (clear) {
        mediator.todosData.clear();
      }

      mediator.todosData.set(id, { title, completed });

      for (let [key, value] of mediator.todosData.entries()) {

        console.log(key);
        console.log(value.title);
        console.log(value.completed);
        console.log('break');

      }
    });

  }());

  /**
   * add:
   * remove
   * insert
   * update
   */

  (function updateName() {

    // Publish/Broadcast the 'nameChange' event with the new data
    mediator.publish('todos', { id: Date.now(), title: 'jdoe', completed: true });
    mediator.publish('todos', { id: Date.now(), title: 'janeDoe', completed: false });

  }());

})(window, mediator));
