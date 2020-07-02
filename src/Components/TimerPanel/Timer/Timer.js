import React from "react";
import "./Timer.css";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerControls from "../TimerControls/TimerControls";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      elapsedMinutes: 0,
      elapsedSeconds: 0,
      pause: true,
      time: 25,
      roundFinished: true,
    };

    this.handle_changeTime = this.handle_changeTime.bind(this);
    this.handle_startStop = this.handle_startStop.bind(this);
  }

  componentDidMount() {
    this.setState({
      minutes: this.state.time,
    });

    this.myInterval = setInterval(() => {
      const seconds = this.state.seconds;
      const minutes = this.state.minutes;

      if (!this.state.pause) {
        if (seconds > 0) {
          this.setState(({ seconds, elapsedSeconds }) => ({
            seconds: seconds - 1,
            elapsedSeconds: elapsedSeconds + 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (this.state.roundFinished) {
              this.roundLogic();
              this.handle_changeTime(null, 5); // For testing purposes, break time is set to 1 minute
              this.handle_startStop();
              this.setState({
                roundFinished: false,
              });
            } else {
              if (this.props.todo.length !== 0) {
                if (
                  this.props.todo[0]["finishedRounds"] ===
                  this.props.todo[0]["rounds"]
                ) {
                  this.roundLogic();
                }
              }
              this.handle_changeTime(null, 25); // Time is set to default once the roundFinished is false
              if (this.props.todo.length !== 0) {
                this.handle_startStop();
              }
              this.setState({
                roundFinished: true,
              });
            }
          } else {
            this.setState(({ minutes, elapsedMinutes }) => ({
              minutes: minutes - 1,
              elapsedMinutes: elapsedMinutes + 1,
              seconds: 59,
            }));
          }
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  componentDidUpdate(prevState) {}

  handle_startStop = () => {
    if (this.state.pause) {
      this.setState({
        pause: false,
      });
    } else {
      this.setState({
        pause: true,
      });
    }
  };

  handle_changeTime = (e, value) => {
    this.setState({
      pause: true,
      minutes: value,
      time: value,
      seconds: 0,
      elapsedMinutes: 0,
      elapsedSeconds: 0,
    });
  };

  render_ongoingTask = () => {
    if (this.props.todo.length !== 0) {
      if (this.props.todo[0]["notes"] === "") {
        var display = "none";
      }

      return (
        <div className="ongoingTask">
          <div className="ongoingTaskRow row justify-content-between">
            <h5 style={{ fontSize: "1.5rem", fontFamily: "ProximaNovaBold" }}>
              {this.props.todo[0]["taskName"]}
            </h5>
            <h5>
              {this.props.todo[0]["finishedRounds"]}/
              {this.props.todo[0]["rounds"]}
            </h5>
          </div>
          <p
            style={{
              display: display,
              maxWidth: "100%",
              fontSize: "1.2rem",
              wordBreak: "break-word",
            }}
          >
            {this.props.todo[0]["notes"]}
          </p>
        </div>
      );
    }
  };

  roundLogic = () => {
    if (this.props.todo.length !== 0) {
      if (
        this.props.todo[0]["finishedRounds"] + 1 >
        this.props.todo[0]["rounds"]
      ) {
        var finishedTask = this.props.todo.shift();
        var done = [finishedTask, ...this.props.done];

        this.props.set_todo(this.props.todo);
        this.props.set_done(done);
      } else {
        var list = this.props.todo;
        list[0]["finishedRounds"] += 1;
        this.props.set_todo(list);
      }
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }} id="Timer">
        <div>
          <CircularProgressbar
            className="img-fluid"
            value={this.state.elapsedSeconds}
            minValue={0}
            maxValue={this.state.time * 60}
            text={`${this.state.minutes}:${
              this.state.seconds < 10
                ? `0${this.state.seconds}`
                : this.state.seconds
            }`}
            strokeWidth={5}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#ff8906",
              textSize: "1rem",
              textColor: "#fffffe",
              pathColor: "#fffffe",
              trailColor: "transparent",
            })}
          />
          <TimerControls
            handle_startStop={this.handle_startStop}
            handle_changeTime={this.handle_changeTime}
            pause={this.state.pause}
          />
        </div>
        <div style={{ marginTop: "4rem" }}>{this.render_ongoingTask()}</div>
      </div>
    );
  }
}

export default Timer;
