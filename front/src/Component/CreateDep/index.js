import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createdepAction, getAllUser } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const CreateDep = () => {
  const [values, setValues] = useState({
    departmentName: "",
    categoryName: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    departmentName: "",
    categoryName: "",
    location: "",
  });
  const [selectUser, setSelectUser] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        values.departmentName === "" ||
        values.categoryName === "" ||
        values.location === ""
      ) {
        setErrors({
          ...errors,
          departmentName:
            values.departmentName === ""
              ? "Please enter departmentName"
              : errors.departmentName,
          categoryName:
            values.categoryName === "" ? "Please enter categoryName " : errors.categoryName,
        });
        return false;
      }
      let response = await createdepAction({ payload: values });
      if (response.status === false) {
        throw {
          message: response.message || "Something went during Registration",
        };
      }
      if (response.status === true) {
        toast.success("Create Successfully");
        return;
      }
    } catch (err) {
      let message =
        err && err.message ? err.message : "Something went wrong during login";
      toast.error(message);
      return false;
    }
  };
  return (
    <div>
      <Link to="/dashboard">Back</Link>
      <form action="action_page.php" method="post">
        <div className="container">
          <label>Department Name</label>
          <input
            type="text"
            placeholder="Enter Department Name"
            value={values.departmentName}
            onChange={(e) => {
              setErrors({
                ...errors,
                departmentName: null,
              });
              setValues({ ...values, departmentName: e.target.value });
            }}
          />
          {errors.departmentName && <span className="error">{errors.departmentName}</span>}
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={values.categoryName}
            onChange={(e) => {
              setErrors({
                ...errors,
                categoryName: null,
              });
              setValues({ ...values, categoryName: e.target.value });
            }}
          />{" "}
          {errors.categoryName && (
            <span className="error">{errors.categoryName}</span>
          )}
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter Location"
            value={values.location}
            onChange={(e) => {
              setErrors({
                ...errors,
                location: null,
              });
              setValues({ ...values, location: e.target.value });
            }}
          />{" "}
          {errors.location && (
            <span className="error">{errors.location}</span>
          )}
        </div>
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};
export default CreateDep;
