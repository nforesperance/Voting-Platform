import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";

const { Option } = Select;

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      candidate: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Code do not match");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  candidate = e => {
    this.setState({
      candidate: !this.state.candidate
    });
    console.log(e.target.candidate);
  };
  postValidator = (rule, value, callback) => {
    const { form } = this.props;
    if (!value && form.getFieldValue("candidate")) {
      callback("Please specify your post");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className = "register">
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please select your name!" }]
          })(
            <Select
              showSearch
              placeholder="Select your Name"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Harley">Harley Marshall</Option>
              <Option value="John">John Doe</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Secret Code" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your secret code"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Code" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your code!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator("candidate", {
            valuePropName: "checked"
          })(
            <Checkbox onChange={this.candidate}>Are you a candidate?</Checkbox>
          )}
        </Form.Item>
        {this.state.candidate && (
          <Form.Item label="Post" className="posts">
            {getFieldDecorator("post", {
              rules: [
                { required: false, message: "Please select your post" },
                {
                  validator: this.postValidator
                }
              ]
            })(
              <Select
                showSearch
                placeholder="Select your Post"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="male">President</Option>
                <Option value="female">Vice Prsident</Option>
              </Select>
            )}
          </Form.Item>
        )}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
