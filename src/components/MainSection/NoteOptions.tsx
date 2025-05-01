import { useState } from "react";
import noteOptions from "../../assets/icons/Notes-Dropdown.svg";
import trashIcon from "../../assets/icons/Trash-Icon.svg";
import favoriteIcon from "../../assets/icons/Favourites-Icon.svg";
import archiveIcon from "../../assets/icons/Archive-Icon.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { note } from "../../types/note";

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
  isDeleted: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | {
          data: note;
        }
      | undefined,
      Error
    >
  >;
}

export const NoteOptions = ({
  setNoteState,
  updateNote,
  folderId,
  isDeleted,
  isArchived,
  isFavorite,
  refetch,
}: NoteOptionsComponentProps) => {
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickTrashHandler = async () => {
    await updateNote(true, false, false);
    setNoteState("deleted");
    navigate(`/folder/${folderId}`);
  };

  const onClickFavoriteHandler = async () => {
    if (isFavorite) {
      await updateNote(false, false, false);
      toast("Note removed from favorites.");
    } else {
      await updateNote(false, true, false);
      toast("Note added to favorites.");
    }
    setNoteOptionsOpen(false);
    refetch();
  };

  const onClickArchiveHandler = async () => {
    if (isArchived) {
      await updateNote(false, false, false);
      toast("Note unarchived.");
    } else {
      await updateNote(false, false, true);
      toast("Note archived.");
    }
    setNoteOptionsOpen(false);
    refetch();
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
        <div className="absolute right-4 top-10 bg-gray-600 px-4 py-2 rounded-md w-48">
          <li
            onClick={onClickTrashHandler}
            className="list-none flex gap-x-4 px-2 py-1 cursor-pointer"
          >
            <img src={trashIcon} alt="trash" />
            <span className="text-white/60 text-sm">
              {isDeleted ? "Restore" : "Delete"}
            </span>
          </li>
          <li
            onClick={onClickFavoriteHandler}
            className="list-none flex gap-x-4 px-2 py-1 cursor-pointer"
          >
            <img src={favoriteIcon} alt="favorite" />
            <span className="text-white/60 text-sm">
              {isFavorite ? "Remove from favorite" : "Add to favorite"}
            </span>
          </li>
          <li
            onClick={onClickArchiveHandler}
            className="list-none flex gap-x-4 px-2 py-1 cursor-pointer"
          >
            <img src={archiveIcon} alt="archive" />
            <span className="text-white/60 text-sm">
              {isArchived ? "Unarchive" : "Archive"}
            </span>
          </li>
        </div>
      )}
    </div>
  );
};
