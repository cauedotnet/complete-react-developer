import { Component } from "react";
import "./card-list.styles.css";

import Card from "../card/card.component";

class CardList extends Component {
  render() {
    console.log("render cardlist");
    const { monsters } = this.props;
    return (
      <div className="card-list">
        {monsters.map((monster, i) => {
          return <Card monster={monster} />;
        })}
      </div>
    );
  }
}

export default CardList;
