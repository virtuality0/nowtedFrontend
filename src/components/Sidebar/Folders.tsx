import { useQuery } from "@tanstack/react-query";
import { folder } from "../../types/folder";
import addFolder from "../../assets/icons/Add-Folder-Icon.svg";
import useAxiosApi from "../../utils/axiosClient";
import deleteFolder from "../../assets/icons/Trash-Icon.svg";
import folderIcon from "../../assets/icons/Folder-Icon.svg";
import { useNavigate } from "react-router-dom";

export const Folders = () => {
  const navigate = useNavigate();
  const axiosApi = useAxiosApi();
  const fetchFolders = () => {
    return axiosApi.get<{ data: folder[]; total: number }>("/folder");
  };
  const { data, refetch } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });

  const addFolderClickedHandler = async () => {
    await axiosApi.post("/folder", {
      name: "New Folder",
    });
    refetch();
  };

  const deleteFolderClickedHandler = async (folderId: string) => {
    await axiosApi.delete(`/folder/${folderId}`);
    refetch();
  };

  const onClickFolderHandler = (folderId: string) => {
    navigate(`/folder/${folderId}`);
  };

  return (
    <div className="flex flex-col gap-y-4 px-2 py-1">
      <div className="flex justify-between">
        <h1 className="text-white/60 text-sm">Folders</h1>
        <img
          onClick={addFolderClickedHandler}
          src={addFolder}
          alt="add folder icon"
          className="cursor-pointer"
        />
      </div>
      <div
        style={{ maxHeight: "calc(5 * 2rem)" }}
        className="flex flex-col overflow-y-scroll h-42"
      >
        {data?.data.data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center shrink-0 h-[2rem] cursor-pointer"
            >
              <div
                onClick={() => {
                  onClickFolderHandler(item.id);
                }}
                className="flex gap-x-4 items-center"
              >
                <img src={folderIcon} alt="folder icon" />
                <span className="text-white/60">{item.name}</span>
              </div>
              <img
                onClick={() => {
                  deleteFolderClickedHandler(item.id);
                }}
                src={deleteFolder}
                alt="Delete folder"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
