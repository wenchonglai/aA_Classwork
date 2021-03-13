// Function.prototype.myDebounce = function(interval_floor){
//   let being_executed = true;

//   setTimeout(() => {
//     being_excuted = false;
//     if (being_excuted == false){
//       return this(...args);
//     }
//   }, interval);
// }

Function.prototype.myDebounce = function(interval_floor){
  let being_executed = false;

  return (...args) => {
    if (being_executed === false){
      being_executed = true;
      setTimeout(() => {
        return this(...args);
        being_executed = false;
      }, interval_floor);
    }
  }
}

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }

  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}

const searchBar = new SearchBar();
searchBar.search = searchBar.search.myDebounce(500);

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
};

queryForHelloWorld();

