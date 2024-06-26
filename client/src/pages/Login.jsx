import React from "react";
import { Form, Input, Button, message } from "antd";
import "../styles/Loginstyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux';
import {showLoading, hideLoading} from "../redux/features/alertSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
     // console.log(values)
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
     // console.log(res)
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token) 
        message.success("Login Successfull");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(`Error in your login page ${error}`);
      message.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">
            Not a user Register here
          </Link>
          <Button className="btn btn-primary" type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
