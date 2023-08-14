import { useState } from "react";
import { useDispatch } from "react-redux";

import { setSignupData } from "../slices/authSlice";
import { signUp } from "../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const { user_name, email, password } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
    };

    dispatch(setSignupData(signupData));
    dispatch(signUp(user_name, email, password, navigate));
  };

  return (
    <div className="h-[500px] w-[400px] flex flex-col border  mx-auto mt-[100px]">
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col justify-center items-center">
          <div>Register Form</div>
          <div className="flex flex-col mt-[30px]">
            <label htmlFor="user_name">User Name</label>

            <input
              required
              type="text"
              name="user_name"
              value={user_name}
              onChange={handleOnChange}
              placeholder="Enter User name"
              className="border px-[20px] py-[7px]"
            />
          </div>
          <div className="flex flex-col mt-[30px]">
            <label htmlFor="email">Email</label>

            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="border px-[20px] py-[7px]"
            />
          </div>

          <div className="flex flex-col mt-[30px]">
            <label>
              <p>Password</p>
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="border px-[20px] py-[7px]"
              />
            </label>
          </div>
          <div className="mt-[30px]">
            <div className="flex space-x-[40px] ">
              <button
                type="submit"
                className="px-[15px] py-[7px] bg-blue-500 text-white"
              >
                Create Account
              </button>
              <Link to="/login">
                <p className="px-[20px] py-[7px] bg-blue-500 text-white">
                  Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
