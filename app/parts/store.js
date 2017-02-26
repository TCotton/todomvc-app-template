class Store {

  constructor(APP) {

    const mediator = this.mediator = APP.mediator;

    /**
     * @type {Storage}
     */
    const localStorage = window.localStorage;

    if (!localStorage.getItem('todo')) {

      /**
       * set localStorage session for first user
       * @type {Map}
       */

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
      this.dataFlowTotal();

    }.bind(this));

    this.update();
    this.add();
    this.delete();

  }

  /**
   * @description niavly sets data as a string on the main component which is acted upon in the observer
   * @param data {Map}
   */

  dataFlow(data) {
    const mainComp = document.querySelector('main-component');
    mainComp.setAttribute('listblock', APP.Helpers.mapToJson(data));
  }

  dataFlowTotal() {
    const mainComp = document.querySelector('footer-component');
    mainComp.setAttribute('total', this.mediator.todosData.size.toString());
  }

  add() {

    document.body.addEventListener('add', function (event) {
      this.mediator.publish('todos', { id: Date.now(), title: event.detail.title, completed: false });
      this.dataFlowTotal();
    }.bind(this));

  }

  delete() {

    document.body.addEventListener('delete', function (event) {

      console.log(this.mediator.todosData.size);

      this.mediator.todosData.delete(Number.parseInt(event.detail.id));

      this.dataFlow(this.mediator.todosData);

      this.dataFlowTotal();

      console.log(this.mediator.todosData.size);

    }.bind(this));

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
