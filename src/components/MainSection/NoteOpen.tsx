import { useCallback, useEffect, useState } from "react";
import { note } from "../../types/note";
import calendarIcon from "../../assets/icons/Calender-Icon.svg";
import useAxiosApi from "../../utils/axiosClient";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { NoteOptions } from "./NoteOptions";
import { useUpdateNote } from "../../store/store";

interface NoteOpenComponetProps {
  setNoteState: React.Dispatch<
    React.SetStateAction<"initial" | "opened" | "deleted">
  >;
}

export const NoteOpen = ({ setNoteState }: NoteOpenComponetProps) => {
  const [noteData, setNoteData] = useState<{
    title: string;
    content: string;
    createdAt: string;
  }>({
    title: "",
    content: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const axiosApi = useAxiosApi();
  const params = useParams();
  const noteId = params.noteId;
  const folderId = params.folderId;
  const setUpdateNote = useUpdateNote((state) => state.setUpdateNote);

  const fetchNote = async () => {
    try {
      if (noteId) {
        if (folderId === "Trash") {
          setNoteState("deleted");
          return;
        }
        const response = await axiosApi.get<{ data: note }>(`/note/${noteId}`);
        return response.data;
      }
    } catch (err) {
      setNoteState("initial");
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["note", noteId],
    queryFn: fetchNote,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setNoteData({
        ...noteData,
        content: data.data.content,
        title: data.data.title,
        createdAt: new Date(data.data.createdAt).toLocaleDateString(),
      });
    }
  }, [data]);

  const udpateNote = useCallback(
    async (
      deleteNote: boolean = false,
      makeNoteFavorite: boolean = false,
      archiveNote: boolean = false
    ) => {
      await axiosApi.patch<{ msg: string }>(`/note/${noteId}`, {
        title: noteData.title,
        content: noteData.content,
        modifiedAt: new Date().toISOString(),
        isDeleted: deleteNote,
        isFavorite: makeNoteFavorite,
        isArchived: archiveNote,
      });
      setUpdateNote(true);
      setTimeout(() => {
        setUpdateNote(false);
      }, 500);
    },
    [noteData, noteId, setUpdateNote]
  );

  const updateNoteDebouncedFunction = useDebounce(udpateNote, 700);

  const onBlurHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col grow">
      <div>
        <div className="flex items-center px-2 py-2">
          {isEditing ? (
            <input
              className="text-white/60 border-white/60 border-1 rounded-md"
              type="text"
              autoFocus={true}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.select();
              }}
              onBlur={onBlurHandler}
              value={noteData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNoteData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
                updateNoteDebouncedFunction();
              }}
            />
          ) : (
            <span
              onClick={() => {
                setIsEditing(true);
              }}
              className="text-white text-lg"
            >
              {noteData.title}
            </span>
          )}
          <NoteOptions
            setNoteState={setNoteState}
            updateNote={udpateNote}
            folderId={folderId ?? ""}
            isDeleted={data?.data.isDeleted ?? false}
            isArchived={data?.data.isArchived ?? false}
            isFavorite={data?.data.isFavorite ?? false}
            refetch={refetch}
          />
        </div>
        <div className="flex gap-x-2 px-2 py-2">
          <img src={calendarIcon} alt="calendar icon" />
          <span className="text-white/60 text-sm">{noteData.createdAt}</span>
        </div>
      </div>
      <div className="grow overflow-auto">
        <textarea
          value={noteData.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNoteData((prev) => ({
              ...prev,
              content: e.target.value,
            }));
            updateNoteDebouncedFunction();
          }}
          className="size-full text-white/60 border-1 border-white/60 rounded-md px-2 py-1"
          placeholder="Write your note here."
        >
          {noteData.content}
        </textarea>
      </div>
    </div>
  );
};
