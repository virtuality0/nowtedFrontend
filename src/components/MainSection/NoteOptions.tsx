import { useState } from "react";
import noteOptions from "../../assets/icons/Notes-Dropdown.svg";
import trashIcon from "../../assets/icons/Trash-Icon.svg";
import favoriteIcon from "../../assets/icons/Favourites-Icon.svg";
import archiveIcon from "../../assets/icons/Archive-Icon.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface NoteOptionsComponentProps {
  setNoteState: React.Dispatch<
    React.SetStateAction<"initial" | "opened" | "deleted">
  >;
  updateNote: (
    deleteNote: boolean,
    makeNoteFavorite: boolean,
    archiveNote: boolean
  ) => Promise<void>;
  folderId: string;
}

export const NoteOptions = ({
  setNoteState,
  updateNote,
  folderId,
}: NoteOptionsComponentProps) => {
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickTrashHandler = async () => {
    await updateNote(true, false, false);
    setNoteState("deleted");
    navigate(`/folder/${folderId}`);
  };

  const onClickFavoriteHandler = async () => {
    await updateNote(false, true, false);
    setNoteOptionsOpen(false);
    toast("Note added to favorites.");
  };

  const onClickArchiveHandler = async () => {
    await updateNote(false, false, true);
    setNoteOptionsOpen(false);
    toast("Note archived.");
  };

  return (
    <div className="relative grow flex flex-row-reverse">
      <img
        className="cursor-pointer"
        onClick={() => {
          setNoteOptionsOpen((prev) => !prev);
        }}
        src={noteOptions}
        alt="note options"
      />
      {noteOptionsOpen && (
        <div className="absolute right-4 top-10 bg-gray-600 px-4 py-2 rounded-md w-42">
          <li
            onClick={onClickTrashHandler}
            className="list-none flex gap-x-4 px-2 py-1 cursor-pointer"
          >
            <img src={trashIcon} alt="trash" />
            <span className="text-white/60 text-sm">Trash</span>
          </li>
          <li
            onClick={onClickFavoriteHandler}
            className="list-none flex gap-x-4 px-2 py-1 cursor-pointer"
          >
            <img src={favoriteIcon} alt="favorite" />
            <span className="text-white/60 text-sm">Favorite</span>
          </li>
          <li
            onClick={onClickArchiveHandler}
            className="list-none flex gap-x-4 px-2 py-1 cursor-pointer"
          >
            <img src={archiveIcon} alt="archive" />
            <span className="text-white/60 text-sm">Archive</span>
          </li>
        </div>
      )}
    </div>
  );
};
