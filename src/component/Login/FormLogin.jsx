// Import Modules
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionUser } from "../../redux/actionRedux";

// Import File CSS
import classes from "./css/formLogin.module.css";

// Import Components
import bannerForm from "../../assets/images/banner1.jpg";
import Input from "./Input";

// Import Icons
import { IoHome } from "react-icons/io5";
import APIServer from "../../API/customAPI";

export default function FormLogin() {
  // Create + use Schema Yup
  const schemaFormLogin = Yup.object().shape({
    email: Yup.string()
      .required("Email is required !")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|net|org)$/i,
        "Invalid Email !"
      ),
    password: Yup.string()
      .required("Password is required !")
      .min(8, "Password must be 8 characters or more !"),
  });

  // Create + use validate Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaFormLogin,
    onSubmit: async (values) => {
      try {
        const res = await APIServer.user.postLoginUser(values);

        if (res.status === 200) {
          const { message, accessToken, isLoggedIn, cart } = res.data;

          alert(message);
          navigate("..");

          //  Update state: User
          dispatch(actionUser.save({ accessToken, isLoggedIn, cart }));
          return false;
        }
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    },
  });

  // Create + use Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use event handles
  const backHomeHandle = () => {
    navigate("..");
  };

  return (
    <div className={classes["login"]}>
      <img src={bannerForm} alt={bannerForm} loading="lazy" />

      <div className={classes["login-container"]}>
        <IoHome className={classes["icon-home"]} onClick={backHomeHandle} />
        <h1 className={classes["login-title"]}>Sign In</h1>

        <form className={classes["form-login"]} onSubmit={formik.handleSubmit}>
          <Input.Email classes={classes} formik={formik} />
          <Input.Password classes={classes} formik={formik} />
          <button type="submit" className={classes["btn-sign-in"]}>
            SIGN IN
          </button>
        </form>

        <div className={classes["login-footer"]}>
          <p className={classes["footer-title"]}>Create an account?</p>
          <Link to="../signup" className={classes["footer-link"]}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
