import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./index.css";
import userDetails from "../../../services/signup.json";
import {
  minMaxLength,
  validEmail,
  passwordStrength,
  userExists,
} from "../Validation";
import { signup } from "../../../services/ApiService";

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function PersonalDetails(props) {
  const {
    step,
    handleUpdate,
    nextStep,
    prevStep,
    personnalDetailsValue,
    signUpJson,
  } = props;
  console.log(JSON.stringify(signUpJson));
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
    step: 2,
    firstName: "",
    lastName: "",
    middleName: "",
    formErrors: { firstName: "", lastName: "", middleName: "" },
    firstNameValid: false,
    lastNameValid: false,
    middleNameValid: false,
    formValid: false,
  });
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
    console.log(form);

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = form.formErrors;
    let firstNameValid = form.firstNameValid;
    let lastNameValid = form.lastNameValid;
    let middleNameValid = form.middleNameValid;

    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length >= 2;
        fieldValidationErrors.firstName = firstNameValid
          ? ""
          : "first name should have minimum 2 characters";
        break;
      case "lastName":
        lastNameValid = value.length >= 2;
        fieldValidationErrors.lastName = lastNameValid
          ? ""
          : "last name should have minimum 2 characters";
        break;

      case "middleName":
        middleNameValid = value.length >= 2;
        fieldValidationErrors.middleName = middleNameValid
          ? ""
          : "middle name should have minimum 2 characters";
        break;

      default:
        break;
    }
    setForm((values) => ({
      ...values,
      formErrors: fieldValidationErrors,
      firstNameValid: firstNameValid,
      lastNameValid: lastNameValid,
      middleNameValid: middleNameValid,
    }));

    validateForm();
  };

  const validateForm = () => {
    setForm((values) => ({
      ...values,
      formValid:
        form.firstNameValid && form.lastNameValid && form.middleNameValid,
    }));
  };

  const errorClass = (error) => {
    return error.length === 0 ? "" : "has-error";
  };

  const onSignup = () => {
    nextStep(form, "personalDetails");
  };

  const redirectTo = () => {
    handleUpdate(1);
  };

  useEffect(() => {
    if (personnalDetailsValue != null) {
      setForm(personnalDetailsValue);
    }
  }, []);
  return (
    <>
      <form className="demoForm">
        <div className="form-container">
          <div className="title"> Sign Up</div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.firstName
            )}`}
          >
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className={
                form.formErrors.firstName.length > 0
                  ? "is-invalid form-control"
                  : "form-control"
              }
              name="firstName"
              placeholder="Please enter first name"
              value={form.firstName}
              onChange={(e) => handleUserInput(e)}
            />
            {
              <div className="invalid-feedback">
                {form.formErrors.firstName}
              </div>
            }
          </div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.lastName
            )}`}
          >
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className={
                form.formErrors.lastName.length > 0
                  ? "is-invalid form-control"
                  : "form-control"
              }
              name="lastName"
              placeholder="Please enter last name"
              value={form.lastName}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.lastName}</div>}
          </div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.middleName
            )}`}
          >
            <label htmlFor="middleName" className="form-label">
              Middle name
            </label>
            <input
              type="text"
              className={
                form.formErrors.middleName.length > 0
                  ? "is-invalid form-control"
                  : "form-control"
              }
              name="middleName"
              placeholder="Please enter middle name"
              value={form.middleName}
              onChange={(e) => handleUserInput(e)}
            />
            {
              <div className="invalid-feedback">
                {form.formErrors.middleName}
              </div>
            }
          </div>

          <div className="button-container">
            <button
              type="button"
              className="btn btn-light cancel"
              onClick={() => redirectTo("userDetails")}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary action"
              disabled={!form.formValid}
              onClick={(e) => onSignup()}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PersonalDetails;
