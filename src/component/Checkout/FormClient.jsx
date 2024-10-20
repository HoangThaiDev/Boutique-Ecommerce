// Import Modules
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

// Import File CSS
import classes from "./css/formClient.module.css";
import Input from "./Input";

// Import Components

export default function FormClient() {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className={classes["form-client"]} onSubmit={formik.handleSubmit}>
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
