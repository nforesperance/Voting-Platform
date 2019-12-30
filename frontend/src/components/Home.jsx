import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import MyNav from "./Navbar";
import { Tabs } from "antd";
import AddA from "./aspian/addAspian";
import AddE from "./election/addElection";
import Election from "./election/Election";

const { TabPane } = Tabs;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aspians: false,
      newaspian: false,
      elections: false,
      newelection: false
    };
  }
  newAspians = e => {
    this.setState({
      aspians: false,
      newaspian: !this.state.newaspian,
      elections: false,
      newelection: false
    });
  };
  aspians = e => {
    this.setState({
      aspians: true,
      newaspian: false,
      elections: false,
      newelection: false
    });
  };
  newElection = e => {
    this.setState({
      aspians: false,
      newaspian: false,
      elections: false,
      newelection: !this.state.newelection
    });
  };
  elections = e => {
    this.setState({
      aspians: false,
      newaspian: false,
      elections: !this.state.elections,
      newelection: false
    });
  };
  render() {
    return (
      <div>
        <MyNav></MyNav>
        <Container className="login">
          <Row>
            <Col xs="0" sm="2"></Col>
            <Col xs="12" sm="8">
              <Tabs>
                <TabPane className="my_tabpane" tab="ASPIANS" key="1">
                  <div className="content">
                    <Row>
                      {!this.state.newaspian && (
                        <Col md="6 mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.newAspians}
                              className="btn btn-primary btn-lg"
                            >
                              Add Aspian
                            </button>
                          </center>
                        </Col>
                      )}

                      {this.state.newaspian && (
                        <Col md="6" className="ml--5 mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.newAspians}
                              className="btn btn-primary btn-sm back"
                            >
                             Hide
                            </button>
                          </center>
                        </Col>
                      )}

                      <Col md="6 " className="mt-5 pb-5">
                        {!this.state.newaspian && (
                          <center>
                            <button
                              onClick={this.aspians}
                              className="btn btn-primary btn-lg view_but"
                            >
                              View Aspians
                            </button>{" "}
                          </center>
                        )}
                      </Col>
                      {this.state.aspians && (
                        <p className="ml-5">List of aspians</p>
                      )}
                      {this.state.newaspian && <AddA className="ml-5"></AddA>}
                    </Row>
                  </div>
                </TabPane>
                <TabPane className="my_tabpane" tab="ELECTIONS" key="2">
                  <div className="content">
                    <Row className="elect_head">
                      {!this.state.newelection && (
                        <Col md="6 mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.newElection}
                              className="btn btn-primary btn-lg"
                            >
                              New Election
                            </button>
                          </center>
                        </Col>
                      )}

                      {this.state.newelection && (
                        <Col md="6 ml--5 mt-5 pb-5">
                          <center>
                            <button
                              onClick={this.newElection}
                              className="btn btn-primary btn-sm back"
                            >
                             Hide
                            </button>
                          </center>
                        </Col>
                      )}

                      <Col md="6  mt-5 pb-5">
                        {!this.state.newelection && !this.state.elections&&(
                          <center>
                            <button
                              onClick={this.elections}
                              className="btn btn-primary btn-lg view_but"
                            >
                              View Elections
                            </button>{" "}
                          </center>
                        )}
                      </Col>
                      <Col md="6  mt-5 pb-5">
                        {!this.state.newelection && this.state.elections && (
                          <center>
                            <button
                              onClick={this.elections}
                              className="btn btn-primary btn-sm back hide"
                            >
                              Hide
                            </button>{" "}
                          </center>
                        )}
                      </Col>
                    </Row>
                    <Row className="elect_list">
                      {this.state.elections && (
                        <React.Fragment>
                          <Election year="2019"></Election>
                          <Election year="2018"></Election>
                          <Election year="2016"></Election>
                          <Election year="2015"></Election>
                          <Election year="2014"></Election>
                          <Election year="2013"></Election>
                        </React.Fragment>
                      )}
                      {this.state.newelection && <AddE className="ml-5"></AddE>}
                    </Row>
                  </div>
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

export default Home;
