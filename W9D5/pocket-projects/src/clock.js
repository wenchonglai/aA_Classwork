import htmlGenerator from "./warmup";

export class Clock{
  get time(){
    return new Date().toTimeString().substr(0,8);
  }
}

const clock = new Clock();

let div = document.getElementById('clock');

// setInterval(() => {
//   // Array.from(div.children).forEach( (child) => {
//   //   div.removeChild(child);
//   // })
  
//   div.innerHTML = "";
//   htmlGenerator(clock.time, div);
  
// }, 1000);

(function animateClock(){
  div.innerText = clock.time;
  requestAnimationFrame(animateClock);
})();