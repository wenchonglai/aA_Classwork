import DOMNodeCollection from './dom_node_collection.js';

function $_(arg){
  if (typeof arg === 'string'){
    let nodeList = document.querySelectorAll(arg);
    return new DOMNodeCollection(...nodeList);
  } else if (arg instanceof HTMLElement){
    return new DOMNodeCollection(arg);
  } else if (arg instanceof Function){
    document.addEventListener('DOMContentLoaded', arg);
  }
}

$_.extend = function(obj, ...args){
  for (let arg of args){
    Object.keys(arg).forEach(key => {
      obj[key] = arg[key];
    })
  }
};

$_.ajax = async function({
  type = 'GET',
  url = window.location.href, 
  contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
  data,
  success = () => {}, 
  error = () => {}
} = {}){
  const xhr = new XMLHttpRequest();

  xhr.open(type, url);
  xhr.setRequestHeader('Content-Type', contentType);

  return await new Promise((res, rej) => {
    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 400)
          res(success(xhr.response, 'success', xhr))
        else rej(error(xhr, 'error', xhr.statusText))
      }
    }
  });
}

window.$_ = $_;

$_(() => console.log(1))