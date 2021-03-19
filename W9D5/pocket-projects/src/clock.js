import htmlGenerator from "./warmup";

export class Clock{
  get time(){
    return new Date().toTimeString().substr(0,8);
  }
}

const clock = new Clock();

let div = document.getElementById('clock');

setInterval(() => {
  // Array.from(div.children).forEach( (child) => {
  //   div.removeChild(child);
  // })
  
  // div.innerHTML = "";
  // htmlGenerator(clock.time, div);
  div.innerText = clock.time;
}, 1000);
