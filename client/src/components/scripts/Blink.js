import React from "react";

export default class Blinker extends React.PureComponent {
  state = {
    message: "This is side",
    side: "A"
  };

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 500);
  }

  tick = () => {
    let newSide;
    if (this.state.side === "A") {
      newSide = "B";
    } else {
      newSide = "A";
    }
    this.setState({ side: newSide });
  };

  render() {
    return (
      <span>
        {this.state.message} {this.state.side}
      </span>
    );
  }
}
