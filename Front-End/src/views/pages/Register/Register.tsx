import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Button, FormItem, Input, Notification, toast } from "@/components/ui";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { login, register } from "@/store/slices/HotelSlice";
import { useNotification } from "@/utils/hooks/useNotification";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().min(6).max(50).required("Please enter your password"),
});

export const Register = () => {
  const [pwInputType, setPwInputType] = useState("password");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.hotels);
  const navigation = useNavigate();
  const displayNotification = useNotification();

  const onPasswordVisibleClick = (e: any) => {
    e.preventDefault();
    setPwInputType(pwInputType === "password" ? "text" : "password");
  };

  const passwordVisible = (
    <span
      className="cursor-pointer flex justify-end ml-2"
      onClick={(e) => onPasswordVisibleClick(e)}
    >
      {pwInputType === "password" ? <HiOutlineEyeOff /> : <HiOutlineEye />}
    </span>
  );

  return (
    <div
      className="flex justify-center items-center"
      style={{
        height: "100vh",
        backgroundImage:
          'url("https://t3.ftcdn.net/jpg/01/83/14/50/360_F_183145047_54atcUh4t9487klui0uOSgFTTjWHC128.jpg")',
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res: any = await dispatch(register({ values }));
          if (res.meta.requestStatus === "fulfilled") {
            localStorage.setItem(
              "userDetails",
              JSON.stringify({
                email: res.payload.details.email,
                username: res.payload.details.username,
              })
            );
            displayNotification("You Are Logged in successfully", "success");
            navigation("/");
          } else {
            displayNotification("Username or Email already Exists", "danger");
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form
            className="w-96 mt-8 mb-14 mr-24 ml-24"
            style={{ minHeight: "500px" }}
          >
            <img
              src="../../../../public/logo.png"
              style={{
                width: "170px",
                height: "150px",
                margin: "0 auto",
                display: "block",
              }}
              alt=""
            />
            <FormItem
              label="User Name"
              size="sm"
              className="mb-4"
              style={{ height: "2.5rem" }}
              invalid={(errors.username && touched.username) as boolean}
              errorMessage={errors.username}
            >
              <Field
                type="text"
                autoComplete="off"
                name="username"
                size="sm"
                placeholder="Username"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="Email"
              size="sm"
              className="mb-4"
              style={{ height: "2.5rem" }}
              invalid={(errors.email && touched.email) as boolean}
              errorMessage={errors.email}
            >
              <Field
                type="text"
                autoComplete="off"
                name="email"
                size="sm"
                placeholder="Email"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="Password"
              size="sm"
              className="mt-8"
              style={{ height: "2.5rem" }}
              invalid={(errors.password && touched.password) as boolean}
              errorMessage={errors.password}
            >
              <Field
                autoComplete="off"
                name="password"
                type={pwInputType}
                prefix={passwordVisible}
                size="sm"
                placeholder="Password"
                className="mb-4"
                component={Input}
              />
            </FormItem>
            <Button
              block
              loading={loading}
              variant="solid"
              size="sm"
              type="submit"
              className="mt-8"
            >
              {loading ? "Register..." : "Register"}
            </Button>
            <div className="mt-6 text-center">
              Already User ?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
