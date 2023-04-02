import React, { useState } from "react";
import { signUpAction } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
toast.configure();
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    hobbies: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    hobbies: "",
  });
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  function CheckPassword(password) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@@#\$%\^&\*])(?=.{8,})/.test(
        password
      )
    ) {
      return true;
    }
    return false;
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        values.firstName === "" ||
        values.lastName === "" ||
        values.email === "" ||
        values.password === "" ||
        values.gender === "" ||
        values.hobbies === "" ||
        !ValidateEmail(values.email) ||
        !CheckPassword(values.password)
      ) {
        setErrors({
          ...errors,
          firstName:
            values.firstName === ""
              ? "Please enter FirstName"
              : errors.firstName,
          lastName:
            values.lastName === "" ? "Please enter LastName " : errors.lastName,
          email:
            values.email === ""
              ? "Please enter email"
              : !ValidateEmail(values.email)
                ? "please enter valid email"
                : errors?.email,
          password:
            values.password === ""
              ? "Please enter password"
              : !CheckPassword(values.password)
                ? "Please enter valid password"
                : errors?.password,
          gender: values.gender === "" ? "Please enter gender" : errors.gender,
          hobbies:
            values.hobbies === "" ? "Please enter hobbies" : errors.hobbies,
        });
        return false;
      }
      let response = await signUpAction({ payload: values });
      if (response.status === false) {
        throw {
          message: response.message || "Something went during Registration",
        };
      }
      if (response.status === true) {
        navigate("/login")
        toast.success("User Register Successfully");
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
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
      <form action="action_page.php" method="post">
        <h3>Register</h3>

        <div className="container">
          <label for="firstname">FirstName</label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter firstName"
            value={values.firstName}
            onChange={(e) => {
              setErrors({
                ...errors,
                firstName: null,
              });
              setValues({ ...values, firstName: e.target.value });
            }}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
          <br />
          <label for="lastName">LastName</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter lastName"
            value={values.lastName}
            onChange={(e) => {
              setErrors({
                ...errors,
                lastName: null,
              });
              setValues({ ...values, lastName: e.target.value });
            }}
          />{" "}
          {errors.lastName && <span className="error">{errors.lastName}</span>}
          <br />
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={values.email}
            onChange={(e) => {
              setErrors({
                ...errors,
                email: null,
              });
              setValues({ ...values, email: e.target.value });
            }}
          />{" "}
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label for="password">Password</label>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={(e) => {
              setErrors({
                ...errors,
                password: null,
              });
              setValues({ ...values, password: e.target.value });
            }}
          />{" "}
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <label for="gender">Gender</label>
          <input
            type="text"
            id="gender"
            placeholder="Enter Gender"
            value={values.gender}
            onChange={(e) => {
              setErrors({
                ...errors,
                gender: null,
              });
              setValues({ ...values, gender: e.target.value });
            }}
          />{" "}
          {errors.gender && <span className="error">{errors.gender}</span>}
          <br />
          <label for="hobbies">Hobbies</label>
          <input
            type="text"
            id="hobbies"
            placeholder="Enter hobbies"
            value={values.hobbies}
            onChange={(e) => {
              setErrors({
                ...errors,
                hobbies: null,
              });
              setValues({ ...values, hobbies: e.target.value });
            }}
          />{" "}
          {errors.hobbies && <span className="error">{errors.hobbies}</span>}
          <br />
        </div>

        <button onClick={handleSubmit}>Register</button>
        <div class="container signin">
          <p>
            Already have an account? <a href="/login">Sign in</a>.
          </p>
        </div>
      </form>
      <div className="help-block errors">
        <p>
          A minimum 8 characters password contains a combination of{" "}
        </p>
        <ul>
          <li>uppercase and lowercase letter </li>
          <li>number </li>
          <li>At least 1 special character.</li>
        </ul>
      </div>

    </div>
  );
};
export default Register;
