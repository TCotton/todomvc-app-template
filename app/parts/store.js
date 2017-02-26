class Store {

  constructor(APP) {

    const mediator = this.mediator = APP.mediator;

    /**
     * @type {Storage}
     */
    const localStorage = window.localStorage;

    if (!localStorage.getItem('todo')) {

      const todosData = new Map();
      const dummyData = { id: Date.now(), title: 'Bake a JavaScript cake', completed: false };
      todosData.set(dummyData.id, { title, completed } = dummyData);
      localStorage.setItem('todo', APP.Helpers.mapToJson(todosData));

    }

    mediator.todosData = APP.Helpers.jsonToMap(localStorage.getItem('todo')) || new Map();

    this.dataFlow(mediator.todosData);

    mediator.subscribe('todos', function ({ id, title, completed = false, clear = false }) {

      if (clear) {
        mediator.todosData.clear();
      }

      mediator.todosData.set(id, { title, completed });

      this.dataFlow(mediator.todosData);

    }.bind(this));

    this.update();

  }

  dataFlow(data) {
    const mainComp = document.querySelector('main-component');
    mainComp.setAttribute('listblock', APP.Helpers.mapToJson(data));
  }

  add(title) {

    // is rejection needed on a to add promise?
    // what will be rejected?
    this.mediator.publish('todos', { id: Date.now(), title, completed: false });

  }

  remove() {
    console.log('remove');
  }

  update() {
    document.body.addEventListener('update', function (event) {

      console.log(this.mediator.todosData.size);

      const todoItem = this.mediator.todosData.get(event.detail.id);
      this.mediator.todosData.set(todoItem.id, {id: todoItem.id, title: todoItem.title, completed: event.detail.completed});

      console.log(this.mediator.todosData.size);

    }.bind(this), false);

  }

}

window.onload = () => {
  APP.Store = new Store(APP);
};
