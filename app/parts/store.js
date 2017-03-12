class Store {

  constructor(APP) {

    this.mediator = {};

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
      todosData.set(dummyData.id, dummyData);
      localStorage.setItem('todo', APP.Helpers.mapToJson(todosData));

    }

    this.mediator.todosData = APP.Helpers.jsonToMap(localStorage.getItem('todo')) || new Map();

    this.dataFlow(this.mediator.todosData);
    this.dataFlowTotal();

    this.update();
    this.add();
    this.delete();

  }

  /**
   * @description niavely sets data as a string on the main component which is acted upon in the observer
   * @param data {Map}
   */

  dataFlow(data) {
    const mainComp = document.querySelector('main-component');
    mainComp.setAttribute('listblock', APP.Helpers.mapToJson(data));
  }

  dataFlowTotal() {
    const mainComp = document.querySelector('footer-component');

    let i = 0;

    for (let value of this.mediator.todosData.values()) {

      if (Object.is(value.completed, false)) {
        i++;
      }

    }

    mainComp.setAttribute('total', i.toString());
  }

  add() {

    document.body.addEventListener('add', (event) => {
      this.mediator.todosData.set(Date.now(), { id: Date.now(), title: event.detail.title, completed: false });
      this.dataFlow(this.mediator.todosData);
      this.dataFlowTotal();
    });

  }

  delete() {

    document.body.addEventListener('delete', (event) => {

      console.log(this.mediator.todosData.size);

      this.mediator.todosData.delete(Number.parseInt(event.detail.id));

      this.dataFlow(this.mediator.todosData);

      this.dataFlowTotal();

      console.log(this.mediator.todosData.size);

    });

  }

  update() {

    document.body.addEventListener('update', (event) => {

      console.log(this.mediator.todosData.size);

      const todoItem = this.mediator.todosData.get(event.detail.id);
      console.dir(todoItem.completed);
      console.dir(event.detail.completed);
      this.mediator.todosData.set(todoItem.id, {
        id: todoItem.id,
        title: event.detail.title || todoItem.title,
        completed: event.detail.completed || todoItem.completed
      });

      if (!event.detail.completed) {
        this.dataFlow(this.mediator.todosData);
      }

      console.log(this.mediator.todosData.size);

    }, false);

  }

}

window.addEventListener('WebComponentsReady', () => {
  APP.Store = new Store(APP);
});