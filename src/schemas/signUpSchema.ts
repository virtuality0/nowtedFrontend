import * as yup from "yup";

export const signUpSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(1, "Username should be atleast 1 character long.")
    .max(100, "Username should be less than 100 characters.")
    .required("Username is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password should be atleast 8 characters long, contain 1 number, 1 uppercase letter, one lowercase letter and 1 special character."
    )
    .required("Please choose a password."),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password and confirm password don't match."),
});
