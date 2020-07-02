import React from "react";
import "./TimerControls.css";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "10",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 35,
    label: "35",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 45,
    label: "45",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 55,
    label: "55",
  },
  {
    value: 60,
    label: "60",
  },
];

class TimerControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  playButtonIcon_handler = () => {
    if (this.props.pause) {
      return (
        <PlayArrowIcon
          id="playButton"
          onClick={() => this.props.handle_startStop()}
        />
      );
    } else {
      return (
        <PauseIcon
          id="playButton"
          onClick={() => this.props.handle_startStop()}
        />
      );
    }
  };

  render() {
    return (
      <div id="TimerControls">
        <div>{this.playButtonIcon_handler()}</div>
        <div className="">
          <Slider
            defaultValue={25}
            aria-labelledby="discrete-slider"
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
            track={false}
            min={0}
            max={60}
            onChange={(e, value) => this.props.handle_changeTime(e, value)}
          />
        </div>
      </div>
    );
  }
}

export default TimerControls;
