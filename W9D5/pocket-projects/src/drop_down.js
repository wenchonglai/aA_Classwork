
const dogs = {
  "Corgi": "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};

const ul = document.querySelector(".drop-down-dog-list");
const nav = document.querySelector("nav.drop-down-dog-nav");
ul.classList.add("hidden");

export default function dogLinkCreator() {
  Object.entries(dogs).forEach( ([name, url]) => {
    let a = document.createElement("a");
    a.innerHTML = name;
    a.setAttribute("href", url);

    let li = document.createElement("li");
    li.classList.add("dog-link");
    li.appendChild(a);
    ul.appendChild(li);
  })
}

dogLinkCreator();

const callback = (e) => {
  ul.classList.toggle("hidden");
}

nav.addEventListener("mouseenter", callback);
nav.addEventListener("mouseleave", callback);