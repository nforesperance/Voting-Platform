import React from "react";
import { Form, Icon, Input, Button,} from "antd";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logedin: false };
  }
  checkLogin = () => {
    if (this.state.logedin) {
      return <Redirect to="/home" />;
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
    // const { logedin } = this.props;
    // if (logedin) {
    //   return <Redirect to="/test" />;
    // }
    const { getFieldDecorator } = this.props.form;
    return (
      <Container className="login">
        {/* the checklogin fucnction helps to login once information is verified */}
        {this.checkLogin()}
        <Row>
          <Col xs="0" sm="3"></Col>
          <Col xs="12" sm="6">
            <Form onSubmit={this.handleSubmit} className="login login-form login-form1">
              <center>
                <h3 className = "ad_login">Administrator Login</h3>
              </center>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <center>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </center>
            </Form>
          </Col>
          <Col xs="0" sm="3"></Col>
        </Row>
      </Container>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(NormalLoginForm);
export default Login;
