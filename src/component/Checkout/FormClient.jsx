// Import Modules
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Import File CSS
import classes from "./css/formClient.module.css";
import Input from "./Input";
import APIServer from "../../API/customAPI";
import { actionUser } from "../../redux/actionRedux";

// Import Components
import Toastify from "../../UI/Toastify";

export default function FormClient() {
  // Create + use Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use Schema Yup
  const schemaFormClient = Yup.object().shape({
    fullname: Yup.string().required("FullName is required !"),
    email: Yup.string()
      .required("Email is required !")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|net|org)$/i,
        "Invalid Email !"
      ),
    phone: Yup.string()
      .required("Phone is required !")
      .matches(/[0-9]/i, "Phone numbers must be numeric characters !")
      .min(10, "Phone must be 10 characters !")
      .max(10, "Phone must be 10 characters !"),
    address: Yup.string().required("Address is required!"),
  });

  // Create + use validate
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: schemaFormClient,
    onSubmit: async (values) => {
      try {
        const res = await APIServer.checkout.createCheckout(values);
        if (res.status === 200) {
          dispatch(actionUser.clearCart());
          toast.success("Create new order success!", {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "toast-checkout-success",
          });
          setTimeout(() => {
            navigate("..");
          }, 1000);
        }
      } catch (error) {
        const { data } = error.response;
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "toast-checkout-error",
        });
      }
    },
  });

  return (
    <form className={classes["form-client"]} onSubmit={formik.handleSubmit}>
      <Toastify
        bodyClassName="toast-body-checkout"
        position="top-center"
        className="toast-checkout-container"
      />
      <div className={classes["form-client-container"]}>
        <Input.FullName classes={classes} formik={formik} />
        <Input.Email classes={classes} formik={formik} />
        <Input.Phone classes={classes} formik={formik} />
        <Input.Address classes={classes} formik={formik} />

        <button type="submit" className={classes["btn-submit"]}>
          Place order
        </button>
      </div>
    </form>
  );
}
