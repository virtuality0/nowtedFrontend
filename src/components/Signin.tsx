import signupBackground from "../assets/images/signupBackground.jpg";
import logo from "../assets/icons/Logo.svg";
import { User } from "../components/ui/icons/User";
import { Button } from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useAxiosApi from "../utils/axiosClient";

export const Signin = () => {
  const navigate = useNavigate();
  const axiosApi = useAxiosApi();
  const initialValue = {
    password: "",
    username: "",
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      try {
        await axiosApi.post<{ msg: string; token: string }>(
          "user/signin",
          {
            username: values.username,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );

        navigate("/");
      } catch (err) {}
    },
  });
  return (
    <div className="flex justify-center items-center size-full">
      <div className="w-[55%] rounded-lg flex bg-white-700 px-4 py-4">
        <div>
          <div className="px-4 py-4 absolute">
            <img src={logo} alt="Nowted Logo" />
          </div>
          <img
            className="rounded-md"
            src={signupBackground}
            alt="Signup background image"
          />
        </div>
        <div className="grow flex flex-col gap-y-8 items-center px-4 py-2">
          <div className="flex flex-col items-center gap-y-4">
            <User />
            <h1 className="font-thin">Welcome back, signin to your account</h1>
            <form
              className="flex flex-col gap-y-2 border-2 border-black-700 shadow-black-700 shadow-sm rounded-md px-4 py-4"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center justify-between border-1 border-black-700 text-black-700 px-4 py-2 rounded-md ">
                <label htmlFor="username">Username</label>
                <input
                  className="text-black-700 rounded-md px-2 py-1 font-thin"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                />
              </div>
              <div className="flex items-center justify-between border-1 border-black-700 text-black-700 px-4 py-2 rounded-md ">
                <label htmlFor="password">Password</label>
                <input
                  className="text-black-700 rounded-md px-2 py-1 font-thin"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  text="Sign In"
                />
                <span>
                  Don't have an account ?
                  <Link
                    to={"/signup"}
                    className="hover:bg-black-700 rounded-md hover:text-white-700 px-2 py-1 cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
