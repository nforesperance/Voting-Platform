import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Form, Input, Button } from "antd";
import MyNav from "../Navbar";
import { Tabs } from "antd";
import AddV from "./addVoter";
import Reg from "./registered";
import Cand from "./candidates";
import Vote from "./vote";
import Result from "./Results";
import jsPDF from "jspdf";
import "jspdf-autotable";
const { TabPane } = Tabs;
//data formated in the cand format are sent to the candidates and vote taps
const cand = [
  {
    post: "President",
    candidates: [
      {
        name: "Harley Marshall"
      },
      {
        name: "Bela Cristine"
      },
      {
        name: "Hans Forman"
      }
    ]
  },
  {
    post: "Vice President",
    candidates: [
      {
        name: "Harley Marshall"
      },
      {
        name: "Bela Cristine"
      },
      {
        name: "Hans Forman"
      }
    ]
  },
  {
    post: "Webmaster",
    candidates: [
      {
        name: "Harley Marshall"
      }
    ]
  },
  {
    post: "Assistant Webmaster",
    candidates: [
      {
        name: "Harley Marshall"
      },
      {
        name: "Bela Cristine"
      }
    ]
  },
  {
    post: "Social Coordinator",
    candidates: []
  }
];
//data formated in the votes format are sent to the candidates and vote taps
const votes = [
  {
    post: "President",
    candidates: [
      {
        name: "Harley Marshall",
        votes: 85
      },
      {
        name: "Bela Cristine",
        votes: 80
      },
      {
        name: "Hans Forman",
        votes: 57
      }
    ]
  },
  {
    post: "Vice President",
    candidates: [
      {
        name: "Harley Marshall",
        votes: 87
      },
      {
        name: "Bela Cristine",
        votes: 74
      },
      {
        name: "Hans Forman",
        votes: 56
      },
      {
        name: "Bela Cristine",
        votes: 56
      },
      {
        name: "Hans Forman",
        votes: 87
      }
    ]
  },
  {
    post: "Webmaster",
    candidates: [
      {
        name: "Harley Marshall",
        votes: 74
      },
      {
        name: "Bela Cristine",
        votes: 87
      }
    ]
  },
  {
    post: "Assistant Webmaster",
    candidates: [
      {
        name: "Harley Marshall",
        votes: 74
      }
    ]
  },
  {
    post: "Social Coordinator",
    candidates: [
      {
        name: "Harley Marshall",
        votes: 74
      },
      {
        name: "Bela Cristine",
        votes: 87
      },
      {
        name: "Hans Forman",
        votes: 56
      }
    ]
  }
];
export class Election extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addvoter: false,
      register: false,
      votes: [],
      total: 217
    };
    this.vote = this.vote.bind(this);
    this.generate = this.generate.bind(this);
    this.bodyRows = this.bodyRows.bind(this);
    this.getPercent = this.getPercent.bind(this);
    this.getmax = this.getmax.bind(this);
  }
  vote(vote) {
    const new1 = this.state.votes.concat(vote);
    const votes = this.removeDuplicates(new1, "post");
    console.log(votes);
    this.setState(state => {
      return {
        votes
      };
    });
  }
  removeDuplicates(array, key) {
    let lookup = {};
    let result = [];
    array
      .slice()
      .reverse()
      .forEach(element => {
        if (!lookup[element[key]]) {
          lookup[element[key]] = true;
          result.push(element);
        }
      });
    return result;
  }
  addVoter = e => {
    this.setState({
      addvoter: !this.state.addvoter,
      register: false
    });
  };
  register = e => {
    this.setState({
      register: !this.state.register,
      addvoter: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //axios here

        console.log(values);
        console.log(this.state.votes);
      } else {
        // return <Redirect to="/test1" />;
        console.log(err);
      }
    });
  };

  generate() {
    const doc = new jsPDF("p", "pt");
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFontStyle("bold");
    doc.text("ASPY ELECTION RESULTS " + this.props.match.params.year, 240, 50);
    let array = votes;
    let pos = 70;
    array.forEach(elt => {
      let body = this.bodyRows(elt.candidates).map(row =>
        Object.keys(row).map(key => row[key])
      );
      doc.autoTable({
        startY: pos,
        head: [
          [
            {
              content: elt.post,
              colSpan: 3,
              styles: { halign: "center", fillColor: [22, 160, 133] }
            }
          ]
        ],
        body: body,
        theme: "grid",
      });
      if (elt.candidates.length === 1) {
        pos = pos + 40;
      }
      if (elt.candidates.length === 2) {
        pos = pos + 33 * elt.candidates.length;
      } else {
        pos = pos + 31 * elt.candidates.length;
      }
    });

    doc.save("Resulets.pdf");
  }
  bodyRows(array) {
    let body = [];
    array.forEach((elt, index) => {
      body.push({
        id: index + 1,
        name: elt.name,
        percent: this.getPercent(elt.votes) + " %"
      });
    });

    return body;
  }
  getPercent(votes) {
    let percent = (votes / this.state.total) * 100;
    return parseFloat(percent.toFixed(2));
  }
  getmax(array) {
    let max = 0;
    array.forEach(elt => {
      if (elt.votes >= max) {
        max = elt.votes;
      }
    });
    return max;
  }
  generate1() {
    // doc.fromHTML($('#root').html(), 15, 15, {
    //     'width': 170,
    //         'elementHandlers': specialElementHandlers
    // });
    // doc.save('sample-file.pdf');
    //////////////
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.addHTML($("#root")[0], function() {
    //   pdf.save("web.pdf");
    // });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <MyNav></MyNav>
        <center>
          <h2>Elections ({this.props.match.params.year})</h2>
        </center>
        <Container className="login">
          <Row>
            <Col xs="0" sm="2"></Col>
            <Col xs="12" sm="8">
              <Tabs>
                <TabPane className="my_tabpane" tab="Register" key="1">
                  <div className="content">
                    <Row>
                      {!this.state.addvoter && (
                        <Col md="6 " className="mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.addVoter}
                              className="btn btn-primary btn-lg view_but"
                            >
                              Add Voter
                            </button>{" "}
                          </center>
                        </Col>
                      )}
                      {this.state.addvoter && (
                        <Col md="6 " className="mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.addVoter}
                              className="btn btn-primary btn-sm back"
                            >
                              Back
                            </button>{" "}
                          </center>
                        </Col>
                      )}

                      {!this.state.addvoter && !this.state.register && (
                        <Col md="6 " className="mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.register}
                              className="btn btn-primary btn-lg view_but"
                            >
                              Registered
                            </button>
                          </center>
                        </Col>
                      )}
                      {this.state.register && (
                        <Col md="6 " className="mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.register}
                              className="btn btn-primary btn-lg view_but"
                            >
                              Hide
                            </button>
                          </center>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      {this.state.addvoter && <AddV className="ml-5"></AddV>}
                      {this.state.register && <Reg className="ml-5"></Reg>}
                    </Row>
                  </div>
                </TabPane>
                <TabPane className="my_tabpane mb-5" tab="Candidates" key="2">
                  {cand.map((elt, index) => {
                    return (
                      <Cand
                        key={index}
                        post={elt.post}
                        candidates={elt.candidates}
                      ></Cand>
                    );
                  })}
                </TabPane>
                <TabPane className="my_tabpane" tab="Vote" key="3">
                  {cand.map((elt, index) => {
                    return (
                      <Vote
                        key={index}
                        post={elt.post}
                        candidates={elt.candidates}
                        vote={this.vote}
                      ></Vote>
                    );
                  })}
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator("code", {
                        rules: [
                          {
                            required: true,
                            message: "Please Enter a Secret Code"
                          }
                        ]
                      })(
                        <Input.Password
                          placeholder="Enter Secret Code"
                          style={{ marginLeft: 30, maxWidth: 320 }}
                        />
                      )}
                    </Form.Item>
                    <center>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Submit
                      </Button>
                    </center>
                  </Form>
                </TabPane>
                <TabPane className="my_tabpane" tab="Results" key="4">
                  {votes.map((elt, index) => {
                    return (
                      <Result
                        key={index}
                        post={elt.post}
                        candidates={elt.candidates}
                        total={this.state.total}
                      ></Result>
                    );
                  })}
                  <center>
                    <button
                      id="cmd"
                      onClick={this.generate}
                      className="btn btn-primary btn-lg"
                    >
                      Generate pdf
                    </button>
                  </center>
                </TabPane>
              </Tabs>
            </Col>
            <Col xs="0" sm="2"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const Elect = Form.create({ name: "normal_login" })(Election);
export default Elect;
