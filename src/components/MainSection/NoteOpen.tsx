import { useEffect, useState } from "react";
import { note } from "../../types/note";
import noteOptions from "../../assets/icons/Notes-Dropdown.svg";
import calendarIcon from "../../assets/icons/Calender-Icon.svg";
import useAxiosApi from "../../utils/axiosClient";
import { useDebouce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface NoteOpenComponetProps {
  setNoteUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NoteOpen = ({ setNoteUpdated }: NoteOpenComponetProps) => {
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
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const axiosApi = useAxiosApi();
  const params = useParams();
  const noteId = params.noteId;

  const fetchNote = async () => {
    const response = await axiosApi.get<{ data: note }>(`/note/${noteId}`);
    return response.data;
  };

  const { data, refetch, isSuccess } = useQuery({
    queryKey: ["note", noteId],
    queryFn: fetchNote,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsSyncing(true); // this is used so that updateNote isn't called before the noteData is actually set
      setNoteData({
        ...noteData,
        content: data.data.content,
        title: data.data.title,
        createdAt: new Date(data.data.createdAt).toLocaleDateString(),
      });
      setTimeout(() => {
        setIsSyncing(false);
      }, 800);
    }
  }, [data, isSuccess]);

  // set the initial data of debounced values only after the intial fetch
  const noteContentDebouncedValue = useDebouce(noteData.content, 700);
  const noteTitleDebouncedValue = useDebouce(noteData.title, 500);

  const udpateNote = async () => {
    await axiosApi.patch<{ msg: string }>(`/note/${noteId}`, {
      title: noteTitleDebouncedValue,
      content: noteContentDebouncedValue,
      modifiedAt: new Date().toISOString(),
    });
    setNoteUpdated(true);
    refetch();
  };

  const onBlurHandler = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (
      (!isSyncing && noteContentDebouncedValue !== data?.data.content) ||
      noteTitleDebouncedValue !== data?.data.title
    ) {
      udpateNote();
    }
    return () => {
      setNoteUpdated(false);
    };
  }, [noteContentDebouncedValue, noteTitleDebouncedValue]);

  return (
    <div className="flex flex-col grow">
      <div>
        <div className="flex justify-between px-2 py-2">
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
                setNoteData({
                  ...noteData,
                  title: e.target.value,
                });
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
          <img src={noteOptions} alt="note options" />
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
            setNoteData({
              ...noteData,
              content: e.target.value,
            });
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
