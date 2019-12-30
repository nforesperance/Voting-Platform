import React, { Component } from "react";
import { Progress } from "antd";

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      candidates: this.props.candidates
    };
    this.getMax = this.getMax.bind(this);
    this.getPercent = this.getPercent.bind(this);
  }
  getMax(array) {
    let max = 0;
    array.forEach(elt => {
      if (elt.votes >= max) {
        max = elt.votes;
      }
    });
    return max;
  }
  getPercent(votes) {
    let percent = (votes / this.props.total) * 100;
    return parseFloat(percent.toFixed(2));
  }
  render() {
    return (
      <div className="can_post">
        <div className="res_head">
          <h4>{this.props.post}</h4>
        </div>
        {this.props.candidates.map((elt, index) => {
          if (elt.votes === this.getMax(this.props.candidates)) {
            return (
              <div key={index} value={elt.id} className="win">
                <h5>{elt.name}</h5>
                 <Progress
                  percent={this.getPercent(elt.votes)}
                  status="active"
                  width={6}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
        {this.props.candidates.map((elt, index) => {
          if (elt.votes !== this.getMax(this.props.candidates)) {
            return (
              <div key={index} value={elt.id} className="loss">
                 <h5>{elt.name}</h5>
                 <Progress
                  percent={this.getPercent(elt.votes)}
                  showInfo={true}
                  width={6}
                  strokeColor={"red"}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default Results;
