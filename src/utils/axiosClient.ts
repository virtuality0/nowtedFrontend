import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAxiosApi = () => {
  const navigate = useNavigate();

  const axiosApi = axios.create({
    baseURL: "http://localhost:3001/api/v1/",
    timeout: 2000,
    withCredentials: true,
  });

  axiosApi.interceptors.response.use(
    (response) => {
      return response; // if request was successful, i.e 2XX code
    },
    (err: AxiosError) => {
      if (err.response?.status == 401) {
        toast("Unauthorized, redirecting to login");
        navigate("/signin");
      } else if (err.response?.status == 404) {
        toast("Not found");
        navigate("not-found");
      } else if (err.response?.status == 500) {
        toast("Something went wrong, please try again");
      }

      return Promise.reject(err);
    }
  );
  return axiosApi;
};

export default useAxiosApi;
