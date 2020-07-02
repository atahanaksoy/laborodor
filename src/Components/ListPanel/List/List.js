import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import EdiText from "react-editext";
import Task from "./Task/Task";
import "./List.css";
import ClearIcon from "@material-ui/icons/Clear";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isEditable = (column) => {
    if (column === undefined) return;
    if (column.name === "to do" || column.name === "done") {
      return <h5 className="editextTitle">{column.name}</h5>;
    } else {
      return (
        <div
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          className="row justify-content-between"
        >
          <EdiText
            viewProps={{
              className: "editextTitle",
            }}
            className="editextTitle"
            showButtonsOnHover={true}
            editOnViewClick={true}
            type="text"
            value={column.name}
            onSave={(val) => this.props.change_listName(column.id, val)}
          />
          <ClearIcon
            id="deleteListButton"
            onClick={() => this.props.delete_list(column["id"])}
          />
        </div>
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.lists !== this.props.lists) {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="list">
        <div>
          <Droppable
            droppableId={this.props.columnId}
            key={this.props.columnId}
          >
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="listCard"
                >
                  {this.isEditable(this.props.column)}
                  {this.props.column.items.map((item, index) => {
                    return (
                      <Draggable
                        key={item.key}
                        draggableId={item.key}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Task
                                change_taskNotes={this.props.change_taskNotes}
                                change_taskName={this.props.change_taskName}
                                delete_task={this.props.delete_task}
                                taskKey={item.key}
                                name={item.taskName}
                                finishedRounds={item.finishedRounds}
                                rounds={item.rounds}
                                notes={item.notes}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>
    );
  }
}

export default List;
