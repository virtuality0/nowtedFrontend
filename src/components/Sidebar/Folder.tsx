import deleteFolder from "../../assets/icons/Trash-Icon.svg";
import folderIcon from "../../assets/icons/Folder-Icon.svg";
import activeFolderIcon from "../../assets/icons/Open-Folder-Icon.svg";
import { useNavigate, useParams } from "react-router-dom";
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
}

export const Folder = ({ refetch, folderId, name }: FolderComponentProps) => {
  const axiosApi = useAxiosApi();
  const navigate = useNavigate();
  const params = useParams();
  const openedFolderId = params.folderId;

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
          src={openedFolderId === folderId ? activeFolderIcon : folderIcon}
          alt="folder icon"
        />
        <span
          className={`${
            openedFolderId === folderId ? "text-white" : "text-white/60"
          }`}
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
