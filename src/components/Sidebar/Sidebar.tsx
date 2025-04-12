import logo from "../../assets/icons/Logo.svg";
import addNote from "../../assets/icons/Plus-Icon.svg";
import { Button } from "../ui/Button";
import { Folders } from "./Folders";
import { Recent } from "./Recent";

export const Sidebar = () => {
  return (
    <div className="w-[20%] h-full flex flex-col gap-y-8 px-4 py-4">
      <img className="w-fit py-1" src={logo} alt="Logo" />
      <div className="px-2 py-2 bg-gray-700 w-[90%] flex justify-center rounded-md items-center">
        <Button size="sm" variant="primary" text="Add Note" endIcon={addNote} />
      </div>
      <Recent />
      <Folders />
    </div>
  );
};
