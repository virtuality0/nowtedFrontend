import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosApi from "../../utils/axiosClient";
import { note } from "../../types/note";
import { useEffect } from "react";
import { NoteDiv } from "./NoteDiv";

interface NotesComponentProps {
  addNoteClicked: boolean;
  noteUpdated: boolean;
}

export const Notes = ({ addNoteClicked, noteUpdated }: NotesComponentProps) => {
  const params = useParams();
  const folderId = params.folderId;
  const axiosApi = useAxiosApi();

  const getNotesByFolderId = async () => {
    return await axiosApi.get<{
      data: note[];
      total: number;
      folderName: string;
    }>(folderId ? `/note?folderId=${folderId}` : `/note/recent`);
  };

  const { data, refetch } = useQuery({
    queryKey: ["notes", folderId],
    queryFn: getNotesByFolderId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (addNoteClicked || noteUpdated) {
      refetch();
    }
  }, [addNoteClicked, noteUpdated]);

  return (
    <div className="bg-gray-700 w-[20%] h-full px-4 py-4">
      <h1 className="text-white text-xl font-medium px-4 py-2">
        {folderId ? data?.data.folderName : "Recent Notes"}
      </h1>
      <div className="flex flex-col px-2 py-2 gap-y-4">
        {data?.data.data.map((item) => {
          return (
            <NoteDiv
              noteId={item.id}
              title={item.title}
              preview={item.preview ?? ""}
              createdAt={item.createdAt}
              folderId={item.folderId ?? ""}
            />
          );
        })}
      </div>
    </div>
  );
};
