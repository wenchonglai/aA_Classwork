import Inbox from "./inbox";
import Sent from "./sent";
import Router from "./router";
import Compose from './compose';

window.addEventListener('DOMContentLoaded', initCallback);

function initCallback(e){

  let routes = {
    'inbox': new Inbox(),
    'sent': new Sent(),
    'compose': new Compose()
  };

  window.addEventListener('hashchange', e => {
    console.log(1);
    e.preventDefault();
    let node = document.querySelector('.content');
    let router = new Router(node, routes);
    router.start();
  });
  
  document.querySelectorAll('.sidebar-nav li').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = el.innerText.toLowerCase();
    });
  });

  window.location.hash = 'inbox';
}
