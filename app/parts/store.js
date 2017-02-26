
const store = (((window, mediator) => {

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

    mediator.subscribe('todos', function ({ id, title, completed = false, clear = false }) {

      if (clear) {
        mediator.todosData.clear();
      }

      mediator.todosData.set(id, { title, completed });

    });

  }());

  /**
   *
   * @param title {string}
   */

  const add = (title) => {

      // is rejection needed on a to add promise?
      // what will be rejected?
      mediator.publish('todos', { id: Date.now(), title, completed: false });

  };

  const remove = () => {
    console.log('remove');
  };

  const update = () => {
    console.log('update');
  };

  return {
    add,
    remove,
    update
  };

})(window, mediator));
