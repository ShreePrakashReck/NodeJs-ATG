import { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });

  const { user_name, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user_name, password, navigate));
  };

  return (
    <div className="h-[350px] w-[400px] flex flex-col border  mx-auto mt-[100px]">
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col align-center items-center">
          <div>
            <p>Login Form</p>
          </div>
          <div className="flex flex-col mt-[30px]">
            <label htmlFor="user_name">User Name</label>
            <input
              required
              type="text"
              name="user_name"
              value={user_name}
              onChange={handleOnChange}
              placeholder="Enter User Name"
              className="border px-[20px] py-[7px]"
            />
          </div>

          <div className="flex flex-col mt-[20px]">
            <label htmlFor="password">Password</label>

            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="border px-[20px] py-[7px]"
            />
          </div>

          <div className="flex flex-col mt-[10px] ml-[100px]">
            <Link to="/forgot-password">
              <p className="text-red-500">Forgot Password</p>
            </Link>
          </div>

          <div className="flex flex-row justify-center items-center mt-[20px] space-x-[40px]">
            <button
              type="submit"
              className="px-[20px] py-[7px] bg-blue-500 text-white"
            >
              Sign In
            </button>
            <div>
              <Link to="/">
                <p className="px-[20px] py-[7px] bg-blue-500 text-white">
                  create Account
                </p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
