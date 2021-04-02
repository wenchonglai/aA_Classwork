export default class Router{
  constructor(node, routes){
    this.node = node;
    this.routes = routes;
  }
  start(){
    this.node.removeEventListener('hashchange', this.render);
    this.node.addEventListener('hashchange', (this.render = this.render.bind(this)));
    this.render();
  }
  activeRoute(){
    let hash = window.location.hash.replace(/\#/g, '');
    return this.routes[hash];
  }
  render(){
    this.node.innerHTML = "";
    let p = document.createElement('p');
    let component = this.activeRoute();
    
    if (component)
      this.node.appendChild(component.render());
  }
}