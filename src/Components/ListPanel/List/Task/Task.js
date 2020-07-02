import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Task.css";
import EdiText from "react-editext";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="task">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <EdiText
              viewProps={{
                className: "editextTaskTitle",
              }}
              className="editextTitle"
              showButtonsOnHover={true}
              editOnViewClick={true}
              type="text"
              value={this.props.name}
              onSave={(val) =>
                this.props.change_taskName(this.props.taskKey, val)
              }
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ marginLeft: "0", marginRight: "0" }}
            className="row"
          >
            <span style={{ color: "#a7a9be", fontSize: "1rem", width: "100%" }}>
              {this.props.finishedRounds} / {this.props.rounds} rounds
            </span>
            <br />
            <EdiText
              viewProps={{
                className: "editextTaskNotes",
              }}
              className="editextTitle"
              showButtonsOnHover={true}
              editOnViewClick={true}
              type="text"
              value={this.props.notes}
              onSave={(val) =>
                this.props.change_taskNotes(this.props.taskKey, val)
              }
            />
            <br />
            <span
              style={{
                marginTop: "1.5rem",
                color: "#a7a9be",
                fontSize: "0.9rem",
              }}
              onClick={() => this.props.delete_task(this.props.taskKey)}
            >
              delete task
            </span>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Task;
