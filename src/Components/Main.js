import React from "react";
import "./Main.css";
import Navbar from "./Navbar/Navbar";
import ListPanel from "./ListPanel/ListPanel";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import TaskForm from "./ListPanel/TaskForm/TaskForm";
import TimerPanel from "./TimerPanel/TimerPanel";
import CustomScroller from "react-custom-scroller";
import AddIcon from "@material-ui/icons/Add";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
    var todoList = {
      id: uuidv4(),
      name: "to do",
      items: [],
    };
    var done = {
      id: uuidv4(),
      name: "done",
      items: [],
    };

    var lists = this.state.lists;
    lists.push(todoList);
    lists.push(done);
    this.setState({ lists: lists });

    this.delete_task = this.delete_task.bind(this);
    this.delete_list = this.delete_list.bind(this);
    this.addTask = this.addTask.bind(this);
    this.add_list = this.add_list.bind(this);
    this.change_listName = this.change_listName.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("lists") !== null) {
      this.setState({
        lists: JSON.parse(localStorage.getItem("lists")),
      });
    }
  }

  add_list = (val) => {
    if (val === "to do" || val === "done") {
      return; //Later return a notification that states that you can't add a list named to do or done.
    }
    var list = {
      id: uuidv4(),
      name: val,
      items: [],
    };

    var lists = Object.values(this.state.lists);
    lists.push(list);
    this.setState({
      lists: lists,
    });

    var option = document.createElement("option");
    option.text = list.name;
    option.id = list["id"];
    document.getElementById("listField").add(option);

    localStorage.setItem("lists", JSON.stringify(this.state.lists));
  };

  delete_list = (id) => {
    for (var i = 0; i < Object.keys(this.state.lists).length; i++) {
      if (this.state.lists[i]["id"] === id) {
        var lists = this.state.lists;
        var list = lists.splice(i, 1);
        this.setState({
          lists: lists,
        });

        document.getElementById("listField").remove(i + 1);
        localStorage.setItem("lists", JSON.stringify(this.state.lists));
      }
    }
  };

  change_listName = (id, val) => {
    if (val === "to do" || val === "done") return;
    for (var i = 0; i < Object.keys(this.state.lists).length; i++) {
      if (this.state.lists[i]["id"] === id) {
        document.getElementById(id).innerText = val;
        this.state.lists[i]["name"] = val;
      }
    }
    localStorage.setItem("lists", JSON.stringify(this.state.lists));
  };

  change_lists = (lists) => {
    this.setState({ lists: lists });
    localStorage.setItem("lists", JSON.stringify(lists));
    console.log(this.state.lists);
  };

  addTask = (name, rounds, listName, notes) => {
    var task = {
      key: uuidv4(),
      taskName: name,
      rounds: rounds,
      finishedRounds: 0,
      notes: notes,
    };

    var index = -1;

    for (var i = 0; i < Object.keys(this.state.lists).length; i++) {
      console.log(this.state.lists[i]["name"]);
      if (this.state.lists[i]["name"] === listName) {
        var list = this.state.lists[i];
        list["items"].push(task);
        var lists = this.state.lists;
        lists[i] = list;

        this.setState({
          lists: lists,
        });
      }
    }
    localStorage.setItem("lists", JSON.stringify(this.state.lists));

    this.forceUpdate();
  };

  set_todo = (list) => {
    var lists = this.state.lists;
    var todo = this.state.lists[0];
    todo["items"] = list;
    lists[0] = todo;
    this.setState({
      lists: lists,
    });
    localStorage.setItem("lists", JSON.stringify(this.state.lists));

    this.forceUpdate();
  };

  set_done = (list) => {
    var lists = this.state.lists;
    var done = this.state.lists[1];
    done["items"] = list;
    lists[1] = done;
    this.setState({
      lists: lists,
    });
    localStorage.setItem("lists", JSON.stringify(this.state.lists));

    this.forceUpdate();
  };

  delete_task = (taskKey) => {
    for (var i = 0; i < Object.keys(this.state.lists).length; i++) {
      for (var j = 0; j < this.state.lists[i]["items"].length; j++) {
        if (this.state.lists[i]["items"][j]["key"] === taskKey) {
          var task = taskKey;
          var lists = this.state.lists;
          var items = this.state.lists[i]["items"];
          items.splice(j, 1);
          lists[i]["items"] = items;
          this.setState({
            lists: lists,
          });
          this.forceUpdate();
          localStorage.setItem("lists", JSON.stringify(this.state.lists));

          return;
        }
      }
    }
  };

  change_taskName = (taskKey, val) => {
    for (var i = 0; i < Object.keys(this.state.lists).length; i++) {
      for (var j = 0; j < this.state.lists[i]["items"].length; j++) {
        if (this.state.lists[i]["items"][j]["key"] === taskKey) {
          var task = taskKey;
          var lists = this.state.lists;
          var items = lists[i]["items"];
          lists[i]["items"][j]["taskName"] = val;
          this.setState({
            lists: lists,
          });
          localStorage.setItem("lists", JSON.stringify(this.state.lists));
          this.forceUpdate();
          return;
        }
      }
    }
  };

  change_taskNotes = (taskKey, val) => {
    for (var i = 0; i < Object.keys(this.state.lists).length; i++) {
      for (var j = 0; j < this.state.lists[i]["items"].length; j++) {
        if (this.state.lists[i]["items"][j]["key"] === taskKey) {
          var task = taskKey;
          var lists = this.state.lists;
          var items = lists[i]["items"];
          lists[i]["items"][j]["notes"] = val;
          this.setState({
            lists: lists,
          });
          localStorage.setItem("lists", JSON.stringify(this.state.lists));
          this.forceUpdate();
          return;
        }
      }
    }
  };

  render() {
    var todo = [this.state.lists[0]];
    var done = [this.state.lists[1]];

    if (this.state.lists[0] !== undefined) {
      var listOfTodo = this.state.lists[0]["items"];
      var listOfDone = this.state.lists[1]["items"];
    }

    return (
      <div id="Main">
        <Navbar />
        <div id="Panels">
          <div id="mainPanel" className="fullPage row">
            <div
              style={{ backgroundColor: "#FAFBFD" }}
              className="columns col-lg-3 col-md-12"
            >
              <h4
                style={{
                  marginLeft: "2rem",
                  marginTop: "6rem",
                  marginBottom: "2rem",
                  fontSize: "1.5rem",
                  fontFamily: "ProximaNovaBold",
                  color: "#0f0e17",
                }}
              >
                add task
              </h4>
              <TaskForm addTask={this.addTask} />
            </div>
            <div
              style={{
                paddingTop: "3rem",
                width: "100%",
                paddingRight: "3rem",
                paddingLeft: "3rem",
              }}
              className="columns col-lg-6 col-md-12"
            >
              <CustomScroller>
                <ListPanel
                  change_taskNotes={this.change_taskNotes}
                  change_taskName={this.change_taskName}
                  delete_task={this.delete_task}
                  delete_list={this.delete_list}
                  fullList={this.state.lists}
                  lists={this.state.lists}
                  change_listName={this.change_listName}
                  change_lists={this.change_lists}
                />
              </CustomScroller>
              <AddIcon
                onClick={() =>
                  this.add_list(
                    "list " + (Object.keys(this.state.lists).length + 1)
                  )
                }
                id="addButton2"
              />
            </div>
            <div
              style={{ paddingTop: "2rem" }}
              className="columns col-lg-3 col-md-12"
            >
              <TimerPanel
                todo={listOfTodo}
                done={listOfDone}
                set_todo={this.set_todo}
                set_done={this.set_done}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
