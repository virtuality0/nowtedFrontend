import { useParams } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import addNote from "../../assets/icons/Plus-Icon.svg";
import { Button } from "../ui/Button";
import { Folders } from "./Folders";
import { Recent } from "./Recent";
import { toast } from "react-toastify";
import useAxiosApi from "../../utils/axiosClient";
import { ExtraFolders } from "./ExtraFolders";

interface SidebarComponentProps {
  setAddNoteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  addNoteClicked: boolean;
}

export const Sidebar = ({
  setAddNoteClicked,
  addNoteClicked,
}: SidebarComponentProps) => {
  const params = useParams();
  const folderId = params.folderId ?? "";
  const axiosApi = useAxiosApi();
  const openedFolder = folderId;

  const addNoteClickedHandler = async () => {
    if (!folderId) {
      toast("Please select a folder to add a note");
      return;
    }

    await axiosApi.post<{ msg: string; id: string }>("/note", {
      title: "New note",
      content: "",
      folderId: folderId,
    });
    setAddNoteClicked(true);
    toast("Note created");
    setTimeout(() => {
      setAddNoteClicked(false);
    }, 1000);
  };

  return (
    <div className="w-[20%] h-full flex flex-col gap-y-8 px-4 py-4">
      <img className="w-fit py-1" src={logo} alt="Logo" />
      <div className="px-2 py-2 bg-gray-700 w-[90%] flex justify-center rounded-md items-center">
        <Button
          onClick={addNoteClickedHandler}
          size="sm"
          variant="primary"
          text="Add Note"
          endIcon={addNote}
        />
      </div>
      <Recent addNoteClicked={addNoteClicked} />
      <Folders openedFolder={openedFolder} />
      <ExtraFolders openedFolder={openedFolder} />
    </div>
  );
};
