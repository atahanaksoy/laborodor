import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List/List";
import "./ListPanel.css";
import FlipMove from "react-flip-move";

class ListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      console.log("ahahahahhaahahha");
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      this.props.change_lists({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      this.props.change_lists({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.lists !== this.props.lists ||
      prevProps.fullList !== this.props.fullList
    ) {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div id="ListPanel" className="row">
        <DragDropContext
          onDragEnd={(result) => this.onDragEnd(result, this.props.fullList)}
        >
          <FlipMove typeName={null}>
            {Object.entries(this.props.lists).map(
              ([columnId, column], index) => {
                return (
                  <div key={column["id"]}>
                    <List
                      change_taskNotes={this.props.change_taskNotes}
                      change_taskName={this.props.change_taskName}
                      delete_task={this.props.delete_task}
                      delete_list={this.props.delete_list}
                      lists={this.props.lists}
                      columnId={columnId}
                      column={column}
                      change_listName={this.props.change_listName}
                    />
                  </div>
                );
              }
            )}
          </FlipMove>
        </DragDropContext>
      </div>
    );
  }
}

export default ListPanel;
