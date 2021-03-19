import htmlGenerator from "./warmup";

export class Clock{
  get time(){
    return new Date().toTimeString().substr(0,8);
  }
}

const clock = new Clock();

let div = document.getElementById('clock');

setInterval(() => {
  htmlGenerator(clock.time, div);
}, 1000);
