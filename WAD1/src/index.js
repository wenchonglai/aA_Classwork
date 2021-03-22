import DOMNodeCollection from './dom_node_collection.js';

function $_(arg){
  if (typeof arg === 'string'){
    let nodeList = document.querySelectorAll(arg);
    return new DOMNodeCollection(...nodeList);
  } else if (arg instanceof HTMLElement){
    return new DOMNodeCollection(arg);
  }

}

window.$_ = $_;