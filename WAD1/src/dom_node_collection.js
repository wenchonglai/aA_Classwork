export default class DOMNodeCollection {

  constructor(...htmlElements){
    this.elements = htmlElements;
  }

  each(callback){ this.elements.forEach(callback); }
  map(callback, thisArg = this.elements){ return Array.prototype.map.call(this.elements, callback, thisArg); }
  flatMap(...args){ return Array.prototype.flatMap.call(this.elements, ...args); }
  empty(){ this.each( el => { el.innerHTML = str; }); }
  append(children){
    if (!(children instanceof Array)) {children = [children];}
    
    this.each(el => {
      el.innerHTML += children.map(child => child.outerHTML).join('');
    });
  }
  attr(key, val){
    let len = arguments.length;

    if (len === 1){ return this.elements[0].getAttribute(key); }

    this.each(el => el.setAttribute(key, val));
    return this;
  }

  addClass(name){
    this.each(el => {el.classList.add(name); });
    return this;
  }

  removeClass(name){
    this.each(el => {el.classList.remove(name); });
    return this;
  }

  toggleClass(name){
    this.each(el => {el.classList.toggle(name); });
    return this;
  }

  children(){
    return new DOMNodeCollection( ...this.flatMap(el => Array.from(el.children)) );
  }

  parent(){
    return new DOMNodeCollection( ...new Set( this.map(el => el.parentNode) ) );
  }

  find(selector){
    return new DOMNodeCollection( ...new Set( this.flatMap(el => Array.from(el.querySelectorAll(selector))) ) );
  }

  remove(){
    this.each(el => {el.innerHTML = ''; })
  }

  html(str){
    if (str){
      this.each(el => { el.innerHTML = str; });
      return this;
    } else {
      return this.elements[0].innterHTML;
    }
  }

  // Phase 2
}