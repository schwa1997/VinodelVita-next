"use client";

import { useRouter } from "next/navigation";

import { Button, Checkbox, Form, Input } from "antd";

import { postCompany } from "@/app/server/api/apis";
import Image from "next/image";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const SignUp = () => {
  const router = useRouter();
  const handleSubmit = (value: {
    id: string;
    companyName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const { companyName, email, phone, password } = value;
    // eslint-disable-next-line consistent-return
    postCompany(companyName, email, phone, password).then((res) => {
      console.log("data", companyName, email, phone, password);
      if (res) {
        router.push("/users/login");
      }
    });
  };
  return (
    <>
      <div>
        <div className="tw-h-screen tw-w-screen tw-z-0 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-flex-wrap tw-items-center tw-place-items-center">
          <div className="tw-shadow-2xl tw-hidden md:tw-block">
            <Image
              color="red"
              src="/signup.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={400}
              height={400}
              priority
            />
          </div>
          <div
            id="signup-form"
            className="tw-w-full tw-h-full md:tw-pt-24 tw-pt-48 tw-flex tw-flex-col tw-bg-gradient-to-r tw-from-violet-300/50 tw-via-purple-300 tw-to-violet-50 tw-text-white "
          >
            <div className="md:tw-justify-start tw-my-auto md:tw-pt-0 tw-px-8 md:tw-px-24 lg:tw-px-32 tw-text-white tw-text-2xl">
              <div>
                <Form
                  {...formItemLayout}
                  name="register"
                  style={{
                    maxWidth: 600,
                  }}
                  scrollToFirstError
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="companyName"
                    label="Company Name"
                    tooltip="Please ensure the company name is correct"
                    rules={[
                      {
                        required: true,
                        message: "Please input your company name!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The new password that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item name="phone" label="Contact Number">
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Should accept agreement")
                              ),
                      },
                    ]}
                    {...tailFormItemLayout}
                  >
                    <Checkbox className="tw-text-white">
                      I have read the{" "}
                      <a href="" className="tw-text-white">
                        agreement
                      </a>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "purple",
                      }}
                    >
                      Register
                    </Button>
                    <br />

                    <a href="/users/login" className="tw-text-white">
                      {" "}
                      Or Login now!
                    </a>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
