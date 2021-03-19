
const partyHeader = document.getElementById('party');

const htmlGenerator = (string, htmlElement) => {
  let p = document.createElement('p');

  p.innerText = string;

  htmlElement.appendChild(p);
};

htmlGenerator(
  'I <3 Vanilla DOM manipulation.',
  document.getElementById('party')
);

export default htmlGenerator;