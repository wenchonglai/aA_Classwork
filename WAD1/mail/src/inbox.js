import {MessageStore} from "./message_store";

export default class Inbox{
  constructor(){

  }
  render(){
    let ul = document.createElement('ul');
    ul.classList.add();

    let messages = MessageStore.getInboxMessages();

    messages.forEach(message => {
      ul.appendChild( this.renderMessage(message) );
    });
    
    return ul;
  }

  renderMessage(message){
    let li = document.createElement('li');

    li.classList.add('message');
    li.innerHTML = ['from', 'subject', 'body']
      .map( key => 
        `<span class=${key}>${message[key]}</span>`
      )
      .join('');

    return li;
  }
}