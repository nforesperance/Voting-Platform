import React, { Component } from "react";
import { Form, Radio,} from "antd";

export class vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      voted: false,
      checked: ""
    };
  }
  onChange = e => {
    const vote = [
      {
        post:this.props.post,
        voted:this.props.candidates[e.target.value].name,
      }
    ]
    this.props.vote(vote);
    this.setState({
      value: e.target.value,
      voted: true,
      vote
    });
  };
  checked = e => {
    if (this.state.value !== "") {
      this.setState({
        checked: true
      });
    } else {
      this.setState({
        checked: false
      });
    }
  };
  render() {
    return (
      <div className="can_post">
        <div className="vote_head">
          <h4>{this.props.post}</h4>
        </div>
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          {this.props.candidates.map((elt, index) => {
            return (
              <Radio
                style={{
                  backgroundColor:
                    this.state.value === index ? "green" : "white",
                  color: this.state.value === index ? "white" : "black"
                }}
                value={index}
                key={index}
                className="vote"
              >
                {elt.name}
                {this.state.value === index ? null : null}
              </Radio>
            );
          })}
        </Radio.Group>
        {this.state.checked === true && (
            <p style ={{color:"red",fontWeight:"bold"}}>Please rememeber to  vote</p>
        )}
      </div>
    );
  }
}

const Vot = Form.create({ name: "nvote" })(vote);
export default Vot;
