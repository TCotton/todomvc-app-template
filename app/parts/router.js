window.addEventListener('WebComponentsReady', () => {

  // TODO: move all class changes into the relevant component

  (function (Router, document) {

    const footerComp = document.querySelector('footer-component');
    const mainComp = document.querySelector('main-component');

    const home = function () {
      mainComp.setAttribute('display', 'home');

      footerComp.querySelector('.selected').className = '';
      footerComp.querySelector(`[href="#/"]`).classList.add('selected');
    };

    const completed = function () {
      mainComp.setAttribute('display', 'completed');

      footerComp.querySelector('.selected').className = '';
      footerComp.querySelector(`[href="#/completed"]`).classList.add('selected');
    };

    const active = function () {
      mainComp.setAttribute('display', 'active');

      footerComp.querySelector('.selected').className = '';
      footerComp.querySelector(`[href="#/active"]`).classList.add('selected');
    };

    const routes = {
      '/': home,
      completed,
      active
    };

    const router = Router(routes);

    router.init();

  })(Router, document);

});
