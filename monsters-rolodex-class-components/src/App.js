import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

class App extends Component {
  constructor() {
    // local state
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
    console.log("1 constructor");
  }

  componentDidMount() {
    console.log("3 componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (event) =>
    this.setState(() => {
      const searchField = event.target.value.toLocaleLowerCase();
      return {
        searchField,
      };
    });

  render() {
    console.log("2 render");

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodox</h1>
        <SearchBox onChangeHandler={onSearchChange} placeHolder="Search Monsters" className="monsters-search-box" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
