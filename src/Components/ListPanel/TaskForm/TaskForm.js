import React from "react";
import "./TaskForm.css";
import Form from "react-bootstrap/Form";
import AddIcon from "@material-ui/icons/Add";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      rounds: 1,
      notes: "",
      placeholder: "",
      listName: "",
    };

    this.handle_taskName = this.handle_taskName.bind(this);
    this.handle_rounds = this.handle_rounds.bind(this);
    this.handle_notes = this.handle_notes.bind(this);
    this.handle_selectedList = this.handle_selectedList.bind(this);
  }

  componentDidMount() {
    this.handle_pickRandomPlaceholder();
  }

  handle_taskName = (e) => {
    document.getElementById("ControlInput1").style.border = "1px solid #ced4da";
    document.getElementById("ControlInput1").style.transition = "0.3s ease";
    this.setState({
      taskName: e,
    });
  };

  handle_rounds = (e) => {
    this.setState({
      rounds: e.target.value,
    });
  };

  handle_notes = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };

  handle_selectedList = (e) => {
    this.setState({
      listName: e.target.value,
    });
  };

  handle_submit = () => {
    if (document.getElementById("ControlInput1").value !== "") {
      this.props.addTask(
        this.state.taskName,
        this.state.rounds,
        this.state.listName,
        this.state.notes
      );
      this.setState({
        taskName: "",
        rounds: 1,
        list: "",
        notes: "",
      });
      document.getElementById("taskForm").reset();
      document.getElementById("ControlInput1").value = "";
    } else {
      document.getElementById("ControlInput1").style.border = "1px solid red";
      document.getElementById("ControlInput1").style.transition = "0.3s ease";
    }
  };

  handle_pickRandomPlaceholder = () => {
    const placeholders = [
      "studying lecture notes",
      "do yoga",
      "paint the walls",
      "cook dinner",
      "build a React.js application",
      "4x12 bench press",
      "study geometry",
      "preparing CV",
    ];
    var randIndex = Math.floor(Math.random() * placeholders.length);
    this.setState({
      placeholder: placeholders[randIndex],
    });
  };

  render() {
    return (
      <div id="TasksForm">
        <Form id="taskForm">
          <Form.Group controlId="ControlInput1">
            <Form.Label>task name</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.state.placeholder}
              onChange={(e) => this.handle_taskName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="ControlSelect1">
            <Form.Label>estimated rounds</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.handle_rounds(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled hidden>
                select rounds
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="listField">
            <Form.Label>list</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => this.handle_selectedList(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled hidden>
                select list
              </option>
              <option>to do</option>
              <option>done</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ControlTextarea1">
            <Form.Label>task notes</Form.Label>
            <Form.Control
              maxlength="300"
              style={{ resize: "none" }}
              as="textarea"
              rows="5"
              onChange={(e) => this.handle_notes(e)}
            />
          </Form.Group>
          <AddIcon onClick={this.handle_submit} id="addButton" />
        </Form>
      </div>
    );
  }
}

export default TaskForm;
