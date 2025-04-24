import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosApi from "../../utils/axiosClient";
import { note } from "../../types/note";
import { useEffect } from "react";
import { NoteDiv } from "./NoteDiv";
import { useUpdateNote } from "../../store/store";

interface NotesComponentProps {
  addNoteClicked: boolean;
}

export const Notes = ({ addNoteClicked }: NotesComponentProps) => {
  const params = useParams();
  const folderId = params.folderId;
  const axiosApi = useAxiosApi();
  const isNoteUpdated = useUpdateNote((state) => state.updateNote);

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
    }
  }, [addNoteClicked, isNoteUpdated]);

  return (
    <div className="bg-gray-700 w-[20%] h-full px-4 py-4 overflow-y-scroll">
      <h1 className="text-white text-xl font-medium px-4 py-2">
        {folderId
          ? folderId === "Trash" ||
            folderId === "Archived" ||
            folderId === "Favorites"
            ? folderId
            : data?.data.folderName
          : "Recent Notes"}
      </h1>
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
