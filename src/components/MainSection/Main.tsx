import { useNavigate } from "react-router-dom";
import useAxiosApi from "../../utils/axiosClient";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";

export const Main = () => {
  const navigate = useNavigate();
  const axiosApi = useAxiosApi();
  const signOutHandler = () => {
    axiosApi
      .post("/user/signout")
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        toast("Something went wrong!");
      });
  };
  return (
    <div className="flex flex-col grow px-4 py-4">
      <div className="flex gap-x-4 justify-end">
        <Button
          onClick={signOutHandler}
          size="md"
          variant="secondary"
          text="Sign Out"
        />
      </div>
    </div>
  );
};
