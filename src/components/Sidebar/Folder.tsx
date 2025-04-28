import deleteFolder from "../../assets/icons/Trash-Icon.svg";
import folderIcon from "../../assets/icons/Folder-Icon.svg";
import activeFolderIcon from "../../assets/icons/Open-Folder-Icon.svg";
import { useNavigate } from "react-router-dom";
import { folder } from "../../types/folder";
import { QueryObserverResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useAxiosApi from "../../utils/axiosClient";

interface FolderComponentProps {
  name: string;
  folderId: string;
  refetch: () => Promise<
    QueryObserverResult<
      AxiosResponse<
        {
          data: folder[];
          total: number;
        },
        any
      >,
      Error
    >
  >;
  openedFolder: string;
}

export const Folder = ({
  refetch,
  folderId,
  name,
  openedFolder,
}: FolderComponentProps) => {
  const axiosApi = useAxiosApi();
  const navigate = useNavigate();

  const deleteFolderClickedHandler = async (folderId: string) => {
    await axiosApi.delete(`/folder/${folderId}`);
    refetch();
  };

  const onClickFolderHandler = (folderId: string) => {
    navigate(`/folder/${folderId}`);
  };
  return (
    <div className="flex justify-between items-center shrink-0 h-[2rem] cursor-pointer">
      <div
        onClick={() => {
          onClickFolderHandler(folderId);
        }}
        className="flex gap-x-4 items-center"
      >
        <img
          src={openedFolder === folderId ? activeFolderIcon : folderIcon}
          alt="folder icon"
        />
        <span
          className={`${
            openedFolder === folderId ? "text-white" : "text-white/60"
          } truncate`}
        >
          {name}
        </span>
      </div>
      <img
        onClick={() => {
          deleteFolderClickedHandler(folderId);
        }}
        src={deleteFolder}
        alt="Delete folder"
      />
    </div>
  );
};
