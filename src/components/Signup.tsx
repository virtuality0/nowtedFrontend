import signupBackground from "../assets/images/signupBackground.jpg";
import logo from "../assets/icons/Logo.svg";
import { User } from "../components/ui/icons/User";
import { Button } from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/signUpSchema";
import useAxiosApi from "../utils/axiosClient";
import { toast } from "react-toastify";

export const Signup = () => {
  const axiosApi = useAxiosApi();
  const initialValue = {
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
  };

  const navigate = useNavigate();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        try {
          await axiosApi.post(
            "user/signup",
            {
              username: values.username,
              email: values.email,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          );
          toast("Signed up successfully.");
          navigate("/signin");
        } catch (err) {}
      },
    });

  return (
    <div className="flex justify-center items-center size-full">
      <div className="w-[60%] rounded-lg flex bg-white-700 px-4 py-4">
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
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <div className="flex flex-col items-center gap-y-4">
            <User />
            <h1 className="font-thin">
              You are one step away from something great !!
            </h1>
            <form
              className="flex flex-col gap-y-2 border-2 border-black-700 shadow-black-700 shadow-sm rounded-md px-4 py-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between border-1 border-black-700 text-black-700 px-4 py-2 rounded-md ">
                  <label htmlFor="email">Email</label>
                  <input
                    className="text-black-700 px-2 py-1 font-thin"
                    type="email"
                    name="email"
                    placeholder="example@abc.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-red-500 font-medium">{errors.email}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between border-1 border-black-700 text-black-700 px-4 py-2 rounded-md ">
                  <label htmlFor="username">Username</label>
                  <input
                    className="text-black-700 rounded-md px-2 py-1 font-thin"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.username && touched.username ? (
                  <p className="text-red-500 font-medium">{errors.username}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between border-1 border-black-700 text-black-700 px-4 py-2 rounded-md ">
                  <label htmlFor="password">Password</label>
                  <input
                    className="text-black-700 rounded-md px-2 py-1 font-thin"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password ? (
                  <p className="text-red-500 font-medium">{errors.password}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between border-1 border-black-700 text-black-700 px-4 py-2 rounded-md ">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    className="text-black-700 rounded-md px-2 py-1 font-thin"
                    type="password"
                    name="confirmpassword"
                    placeholder="Retype the password"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.confirmpassword && touched.confirmpassword ? (
                  <p className="text-red-500 font-medium">
                    {errors.confirmpassword}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-y-2">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  text="Sign Up"
                />
                <span>
                  Already have an account ?{" "}
                  <Link
                    to={"/signin"}
                    className="hover:bg-black-700 rounded-md hover:text-white-700 px-2 py-1 cursor-pointer"
                  >
                    Sign In
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
