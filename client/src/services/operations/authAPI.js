import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";

const { SIGNUP_API, LOGIN_API, FORGET_API } = endpoints;

export function signUp(user_name, email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        user_name,
        email,
        password,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
  };
}

export function login(user_name, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        user_name,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response?.data?.token));

      // Store token in localStorage
      localStorage.setItem("token", JSON.stringify(response?.data?.token));

      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Password or User Name is incorrect");
    }
    dispatch(setLoading(false));
  };
}

export function forgetPassword(password, email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", FORGET_API, {
        password,
        email,
      });

      console.log("FORGET API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Forget Password Successful");
      dispatch(setToken(response?.data?.token));

      // Store token in localStorage
      localStorage.setItem("token", JSON.stringify(response?.data?.token));

      navigate("/login");
    } catch (error) {
      console.log("FORGET API ERROR............", error);
      toast.error("FORGET Password Failed");
    }
  };
}
