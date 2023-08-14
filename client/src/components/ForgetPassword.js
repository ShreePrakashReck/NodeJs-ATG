import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(password, email, navigate));
  };
  return (
    <div>
      <div className="h-[350px] w-[400px] flex flex-col border  mx-auto mt-[100px]">
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col align-center items-center">
            <div>
              <p>Forget Password</p>
            </div>
            <div>
              <div className="flex flex-col mt-[30px]">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border px-[20px] py-[7px]"
                />
              </div>
              <div className="flex flex-col mt-[20px]">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border px-[20px] py-[7px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[20px]">
              <button
                type="submit"
                className="px-[20px] py-[7px] bg-blue-500 text-white"
              >
                Submit
              </button>
            </div>
            <div className="flex flex-col mt-[10px]">
              <Link to="/login">
                <p className="ml-[200px] text-blue-500 ">Back to Login</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
