import { useQuery } from "@tanstack/react-query";
import { folder } from "../../types/folder";
import addFolder from "../../assets/icons/Add-Folder-Icon.svg";
import useAxiosApi from "../../utils/axiosClient";
import { Folder } from "./Folder";
import { useEffect } from "react";
import { useUpdateFolder } from "../../store/store";

interface FoldersComponentProps {
  openedFolder: string;
}

export const Folders = ({ openedFolder }: FoldersComponentProps) => {
  const axiosApi = useAxiosApi();
  const updateFolder = useUpdateFolder((state) => state.updateFolder);

  const fetchFolders = () => {
    return axiosApi.get<{ data: folder[]; total: number }>("/folder");
  };

  const { data, refetch } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
    refetchOnWindowFocus: false,
  });

  const addFolderClickedHandler = async () => {
    await axiosApi.post("/folder", {
      name: "New Folder",
    });
    refetch();
  };

  useEffect(() => {
    if (updateFolder) {
      refetch();
    }
  }, [updateFolder]);

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
            <Folder
              key={item.id}
              folderId={item.id}
              name={item.name}
              refetch={refetch}
              openedFolder={openedFolder}
            />
          );
        })}
      </div>
    </div>
  );
};
