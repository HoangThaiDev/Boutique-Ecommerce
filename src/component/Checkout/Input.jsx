// Import Modules
import React from "react";

// Import Components

const FullName = ({ classes, formik }) => {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor="fullname">FULL NAME:</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        onChange={formik.handleChange}
        value={formik.values.fullname}
        placeholder="Enter Your Full Name Here!"
      />
      {formik.touched.fullname && formik.errors.fullname && (
        <p className={classes["message-error"]}>(⁕) {formik.errors.fullname}</p>
      )}
    </div>
  );
};

const Email = ({ classes, formik }) => {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor="email">EMAIL:</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={formik.handleChange}
        placeholder="Enter Your Email Here!"
      />
      {formik.touched.email && formik.errors.email && (
        <p className={classes["message-error"]}>(⁕) {formik.errors.email}</p>
      )}
    </div>
  );
};

const Phone = ({ classes, formik }) => {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor="phone">PHONE NUMBER:</label>
      <input
        type="number"
        id="phone"
        name="phone"
        onChange={formik.handleChange}
        placeholder="Enter Your Phone Number Here!"
      />
      {formik.touched.phone && formik.errors.phone && (
        <p className={classes["message-error"]}>(⁕) {formik.errors.phone}</p>
      )}
    </div>
  );
};

const Address = ({ classes, formik }) => {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor="address">ADDRESS:</label>
      <input
        type="text"
        id="address"
        name="address"
        onChange={formik.handleChange}
        placeholder="Enter Your Address Here!"
      />
      {formik.touched.address && formik.errors.address && (
        <p className={classes["message-error"]}>(⁕) {formik.errors.address}</p>
      )}
    </div>
  );
};

const Input = {
  FullName,
  Email,
  Phone,
  Address,
};

export default Input;
