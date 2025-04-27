import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosApi from "../../utils/axiosClient";
import { note } from "../../types/note";
import { useEffect, useState } from "react";
import { NoteDiv } from "./NoteDiv";
import { useUpdateFolder, useUpdateNote } from "../../store/store";
import { Edit } from "../ui/icons/Edit";

interface NotesComponentProps {
  addNoteClicked: boolean;
}

export const Notes = ({ addNoteClicked }: NotesComponentProps) => {
  const params = useParams();
  const folderId = params.folderId;
  const axiosApi = useAxiosApi();
  const isNoteUpdated = useUpdateNote((state) => state.updateNote);
  const [editFolderClicked, setEditFolderClicked] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const setUpdateFolder = useUpdateFolder((state) => state.setUpdateFolder);

  const queryParams = {
    isDeleted: folderId === "Trash" ? "true" : "false",
    isArchived: folderId === "Archived" ? "true" : "false",
    isFavorite: folderId === "Favorites" ? "true" : "false",
  };

  const getNotesByFolderId = async () => {
    return await axiosApi.get<{
      data: note[];
      total: number;
      folderName: string;
    }>(
      folderId &&
        folderId !== "Trash" &&
        folderId !== "Archived" &&
        folderId !== "Favorites"
        ? `/note?folderId=${folderId}`
        : `/note/recent?isDeleted=${queryParams.isDeleted}&isArchived=${queryParams.isArchived}&isFavorite=${queryParams.isFavorite}`
    );
  };

  const { data, refetch } = useQuery({
    queryKey: ["notes", folderId],
    queryFn: getNotesByFolderId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (addNoteClicked || isNoteUpdated) {
      refetch();
    } else {
      setFolderTitle(
        folderId &&
          (folderId === "Trash" ||
            folderId === "Archived" ||
            folderId === "Favorites")
          ? folderId
          : data?.data.folderName ?? ""
      );
    }
  }, [addNoteClicked, isNoteUpdated, data]);

  const updateFolder = async () => {
    setUpdateFolder(false);
    await axiosApi.patch(`/folder/${folderId}`, {
      name: folderTitle,
    });
    setUpdateFolder(true);
  };

  const onBlurHandler = async () => {
    setEditFolderClicked((prev) => !prev);
    await updateFolder();
  };

  const onKeyDownHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditFolderClicked(false);
      await updateFolder();
    }
  };

  return (
    <div className="bg-gray-700 w-[20%] h-full px-4 py-4 overflow-y-scroll">
      <div className="flex justify-between items-center text-white">
        {editFolderClicked ? (
          <input
            onKeyDown={onKeyDownHandler}
            value={folderTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFolderTitle(e.target.value);
            }}
            autoFocus={true}
            onBlur={onBlurHandler}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
              e.target.select();
            }}
            type="text"
            className="border-1 border-white/60 px-2 py-1"
          />
        ) : (
          <h1 className="text-white text-xl font-medium px-2 py-1 grow">
            {folderTitle}
          </h1>
        )}
        {!["Trash", "Archived", "Favorites"].includes(folderId ?? "") &&
          !(data?.data.folderName === "Recent Notes") && (
            <div
              onClick={() => {
                setEditFolderClicked((prev) => !prev);
              }}
              className="cursor-pointer px-2 py-1"
            >
              {!editFolderClicked && <Edit size="md" strokeWidth={1.5} />}
            </div>
          )}
      </div>
      <div className="flex flex-col px-2 py-2 gap-y-4">
        {data?.data.data.map((item) => {
          return (
            <NoteDiv
              key={item.id}
              noteId={item.id}
              title={item.title}
              preview={item.preview ?? ""}
              createdAt={item.createdAt}
              folderId={
                folderId === "Trash" ||
                folderId === "Archived" ||
                folderId === "Favorites"
                  ? folderId
                  : item.folderId ?? ""
              }
            />
          );
        })}
      </div>
    </div>
  );
};
