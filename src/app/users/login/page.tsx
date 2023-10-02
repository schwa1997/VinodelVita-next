"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { logIn } from "@/app/server/api/apis";
import ErrorInfo from "@/app/components/LoginInfo";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const onFinish = (value: { companyName: string; password: string }) => {
    setErr(false);
    const { companyName, password } = value;

    // Call the logIn function and handle the promise result
    logIn(companyName, password)
      .then((res) => {
        const { accessToken, role, id } = res;
        localStorage.setItem("jwtToken", accessToken);
        localStorage.setItem("role", role);
        localStorage.setItem("id", id);
        console.log("login");
        localStorage.setItem("currentUser", companyName);
        router.push("/");
        setErr(false);
        setTimeout(() => {
          console.log("log out");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("role");
          localStorage.removeItem("id");
          localStorage.removeItem("currentUser");
          router.push("/users/login");
        }, 60000); // 60000 milliseconds = 60 seconds (1 minute)
      })
      .catch((error) => {
        setErr(true);
        console.error("Login failed:", error.message);
      });
  };

  return (
    <>
      <div>
        <div className="tw-h-screen tw-w-screen tw-z-0 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-flex-wrap tw-items-center tw-place-items-center">
          <div className="tw-shadow-2xl tw-pt-20 tw-hidden md:tw-block">
            <Image
              color="red"
              src="/login.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={400}
              height={400}
              priority
            />
          </div>
          <div
            id="signup-form"
            className="tw-w-full tw-h-full tw-flex tw-flex-col tw-bg-gradient-to-r tw-from-violet-300/50 tw-via-purple-300 tw-to-violet-50 tw-text-white "
          >
            <div className="md:tw-justify-start tw-my-auto md:tw-pt-0 tw-px-8 md:tw-px-24 lg:tw-px-32 tw-text-white tw-text-2xl">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined
                        className="site-form-item-icon"
                        rev={undefined}
                      />
                    }
                    placeholder="Company Name"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined
                        className="site-form-item-icon"
                        rev={undefined}
                      />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <br />

                  <a className="login-form-forgot tw-text-white" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button tw-text-white"
                    style={{
                      backgroundColor: "purple",
                    }}
                  >
                    Log in
                  </Button>
                  <br />

                  <a href="/users/signup" className="tw-text-white">
                    Or register now!
                  </a>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        {err && <ErrorInfo />}
      </div>
    </>
  );
};

export default Login;
