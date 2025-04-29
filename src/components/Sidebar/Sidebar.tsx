import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import addNote from "../../assets/icons/Plus-Icon.svg";
import { Button } from "../ui/Button";
import { Folders } from "./Folders";
import { Recent } from "./Recent";
import { toast } from "react-toastify";
import useAxiosApi from "../../utils/axiosClient";
import { ExtraFolders } from "./ExtraFolders";
import searchIcon from "../../assets/icons/Search-Icon.svg";
import { useEffect, useState } from "react";
import { useDebouce } from "../../hooks/useDebounce";
import { note } from "../../types/note";
import noteIcon from "../../assets/icons/Page-Icon.svg";

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
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchResult, setSearchResult] = useState<note[]>([]);
  const navigate = useNavigate();

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

  const debouncedValue = useDebouce(searchParam, 700);
  const getSearchResult = async () => {
    const response = await axiosApi.get<{
      data: note[];
      total: number;
      folderName: string;
    }>(`/note/recent?search=${debouncedValue}`);
    setSearchResult([...response.data.data]);
  };

  useEffect(() => {
    getSearchResult();
  }, [debouncedValue]);

  return (
    <div className="w-[20%] h-full flex flex-col gap-y-8 px-4 py-4 relative">
      <div className="flex justify-between items-center">
        <img className="w-fit py-1" src={logo} alt="Logo" />
        <img
          onClick={() => setSearchClicked((prev) => !prev)}
          src={searchIcon}
        />
      </div>
      {searchClicked ? (
        <input
          id="search"
          className="border-1 border-white text-white bg-gray-700 px-2 py-1 rounded-md"
          type="text"
          placeholder="Search note"
          autoFocus={true}
          value={searchParam}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchParam(e.target.value);
          }}
        />
      ) : (
        <div className="px-2 py-2 bg-gray-700 w-[90%] flex justify-center rounded-md items-center">
          <Button
            onClick={addNoteClickedHandler}
            size="sm"
            variant="primary"
            text="Add Note"
            endIcon={addNote}
          />
        </div>
      )}
      {searchClicked && (
        <div className="w-[90%] absolute bg-gray-700 min-h-[50%] top-[18%] overflow-y-scroll flex flex-col gap-y-2 px-4 py-2 rounded-md">
          {searchResult.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/folder/${item.folderId}/note/${item.id}`);
                  setSearchClicked(false);
                  setSearchParam("");
                }}
                className="px-2 py-2 w-full bg-gray-600 rounded-md flex justify-between"
              >
                <img src={noteIcon} alt="note icon" />
                <span className="text-white cursor-pointer px-2 py-1 rounded-md grow">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <Recent addNoteClicked={addNoteClicked} />
      <Folders openedFolder={openedFolder} />
      <ExtraFolders openedFolder={openedFolder} />
    </div>
  );
};
