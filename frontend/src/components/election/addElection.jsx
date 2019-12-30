import React from "react";
import { Form, Input, Button,} from "antd";
import { Container} from "reactstrap";
import { Redirect } from "react-router-dom";

class addElection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logedin: false };
  }
  checkLogin = () => {
    if (this.state.logedin) {
      return <Redirect to="/election" />;
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          logedin: true
        });
      } else {
        // return <Redirect to="/test1" />;
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Container className="addelection">
        {/* the checklogin fucnction helps to login once information is verified */}
        {this.checkLogin()}
            <Form onSubmit={this.handleSubmit} className="addelection login-form">
              <center>
                <h3>Add A New Election</h3>
              </center>
              <Form.Item>
                {getFieldDecorator("year", {
                  rules: [
                    { required: true, message: "Please input the year" }
                  ]
                })(
                  <Input
                    placeholder="Enter the Year e.g 2019"
                  />
                )}
              </Form.Item>
              <center>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                 Add
                </Button>
              </center>
            </Form>
      </Container>
    );
  }
}

const Add = Form.create({ name: "normal_login" })(addElection);
export default Add;
