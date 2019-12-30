import React, { Component } from "react";

export class candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      candidates: this.props.candidates
    };
  }
  render() {
    return (
      <div className="can_post">
        <div className="can_head">
          <h4>{this.props.post}</h4>
        </div>
        {this.props.candidates.map((elt, index) => {
          return (
            <div key={index} value={elt.id} className="can">
              <h5>{elt.name}</h5>
            </div>
          );
        })}
      </div>
    );
  }
}

export default candidates;
