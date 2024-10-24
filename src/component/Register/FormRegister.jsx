// Import Modules
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/formRegister.module.css";

// Import Components
import bannerForm from "../../assets/images/banner1.jpg";
import Input from "./Input";
import Toastify from "../../UI/Toastify";

// Import Icons
import { IoHome } from "react-icons/io5";

export default function FormRegister() {
  // Create + use Schema Yup
  const schemaFormRegister = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string()
      .required("Email is required !")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|net|org)$/i,
        "Email is invalid !"
      ),
    password: Yup.string()
      .required("Password is required !")
      .min(8, "Password must be 8 characters or more !"),
    phone: Yup.string()
      .required("Phone is required !")
      .matches(/[0-9]/i, "Phone numbers must be numeric characters !")
      .min(10, "Phone must be 10 characters !")
      .max(10, "Phone must be 10 characters !"),
  });

  // Create + use validate Formik
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: schemaFormRegister,
    onSubmit: async (values) => {
      try {
        const res = await APIServer.user.postSignUpUser(values);

        if (res.status === 201) {
          const { message } = res.data;
          alert(message);
          navigate("../login");
        }
      } catch (error) {
        const { data } = error.response;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "toast-register-error",
        });
      }
    },
  });

  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event handles
  const backHomeHandle = () => {
    navigate("..");
  };

  return (
    <div className={classes["register"]}>
      <Toastify bodyClassName="toast-body-register" position="top-right" />
      <img src={bannerForm} alt={bannerForm} loading="lazy" />

      <div className={classes["register-container"]}>
        <IoHome className={classes["icon-home"]} onClick={backHomeHandle} />
        <h1 className={classes["register-title"]}>Sign Up</h1>

        <form
          className={classes["form-register"]}
          onSubmit={formik.handleSubmit}
        >
          <Input.FullName classes={classes} formik={formik} />
          <Input.Email classes={classes} formik={formik} />
          <Input.Password classes={classes} formik={formik} />
          <Input.Phone classes={classes} formik={formik} />

          <button type="submit" className={classes["btn-sign-up"]}>
            SIGN UP
          </button>
        </form>

        <div className={classes["register-footer"]}>
          <p className={classes["footer-title"]}>Login?</p>
          <Link to="../login" className={classes["footer-link"]}>
            Click
          </Link>
        </div>
      </div>
    </div>
  );
}
