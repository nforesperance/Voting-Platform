import React from "react";
import { Form, Icon, Input, Button,} from "antd";
import { Container} from "reactstrap";
import { Redirect } from "react-router-dom";

class addAspian extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logedin: false };
  }
  checkLogin = () => {
    if (this.state.logedin) {
      return <Redirect to="/test1" />;
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
      <Container className="addaspian">
        {/* the checklogin fucnction helps to login once information is verified */}
        {this.checkLogin()}
            <Form onSubmit={this.handleSubmit} className="addaspian login-form">
              <center>
                <h3>Add an Aspian</h3>
              </center>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input aspian name!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Name"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("Matricule", {
                  rules: [
                    { required: true, message: "Please input matricule" }
                  ]
                })(
                  <Input
                    placeholder="matricule"
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

const Add = Form.create({ name: "normal_login" })(addAspian);
export default Add;
