import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");

  /* This is for update method where we get id from the url
  to make sure whether its and update or create.
  if id exists its update or else its create
  based on this we display the page title */
  const { id } = useParams();

  //This is for update: To get data from rest endpoint and populate the form.
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setClub(response.data.club);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  //For validation
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    club: "",
  });

  const navigator = useNavigate();

  //This method is used for both SAVE and UPDATE
  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email, club };
      console.log(employee);
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        createEmployee(employee).then((response) => {
          navigator("/employees");
        }).catch(error =>{
          console.log(error);
        })
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required!";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required!";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required!";
      valid = false;
    }
    if (club.trim()) {
      errorsCopy.club = "";
    } else {
      errorsCopy.club = "Club is required!";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  //use useParams hook to get employee id from the URL
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name: </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name: </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email Id: </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Club: </label>
                <input
                  type="text"
                  placeholder="Enter Club"
                  name="club"
                  value={club}
                  className={`form-control ${errors.club ? "is-invalid" : ""}`}
                  onChange={(e) => setClub(e.target.value)}
                ></input>
                {errors.club && (
                  <div className="invalid-feedback">{errors.club}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
