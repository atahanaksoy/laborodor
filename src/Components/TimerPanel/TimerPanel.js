import React from "react";
import "./TimerPanel.css";
import Timer from "./Timer/Timer";

class TimerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="TimerPanel">
        <Timer
          todo={this.props.todo}
          done={this.props.done}
          set_todo={this.props.set_todo}
          set_done={this.props.set_done}
        />
      </div>
    );
  }
}

export default TimerPanel;
