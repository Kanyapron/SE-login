import React from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LoginInterface } from "../../../interface/Login";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "../../../service/https/index";
import redpanda from "../../../assets/redpanda.png";
function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const clickLoginbt = async (datalogin: LoginInterface) => {
    console.log("ก่อนLogin: ", datalogin);
    const res = await SignIn(datalogin);
    console.log("หลังLogin: ", res);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("roleid", res.data.roleid);
      localStorage.setItem("userRole", res.data.role);

      if (res.data.role === "Admin") {
        messageApi.success(
          "ท่านได้ทำการ เข้าสู่ระบบ " + res.data.role + " สำเร็จ"
        );
        setTimeout(() => {
          navigate("/admin");
        }, 800);
      } else if (res.data.role === "User") {
        messageApi.success(
          "ท่านได้ทำการ เข้าสู่ระบบ " + res.data.role + " สำเร็จ"
        );
        setTimeout(() => {
          navigate("/user");
        }, 800);
      } else if (res.data.role === "Zookeeper") {
        messageApi.success(
          "ท่านได้ทำการ เข้าสู่ระบบ " + res.data.role + " สำเร็จ"
        );
        setTimeout(() => {
          navigate("/zookeeper");
        }, 800);
      } else if (res.data.role === "Zoosales") {
        messageApi.success(
          "ท่านได้ทำการ เข้าสู่ระบบ " + res.data.role + " สำเร็จ"
        );
        setTimeout(() => {
          navigate("/zoosale");
        }, 800);
      }
    } else {
      messageApi.open({
        type: "warning",
        content: "รหัสผ่านหรือข้อมูลผู้ใช้ไม่ถูกต้อง!! กรุณากรอกข้อมูลใหม่",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Row style={{ height: "100vh" }} align="middle" justify="center">
        <Col
          xs={24}
          sm={18}
          md={16}
          lg={14}
          xl={12}
          style={{
            display: "flex",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Left Side Image */}
          <img
            alt="redpanda"
            style={{
              flex: 1,
              backgroundImage: "redpanda",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            src={redpanda}
          ></img>

          {/* Right Side Form */}
          <div style={{ flex: 1.5, padding: "30px", backgroundColor: "#fff" }}>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>LOGIN</h1>

            <Form
              layout="vertical"
              onFinish={clickLoginbt}
              style={{ marginTop: "20px" }}
            >
              {/* Email Field */}
              <Form.Item
                key="email"
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              {/* Sign In Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#4CAF50",
                    borderColor: "#4CAF50",
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
