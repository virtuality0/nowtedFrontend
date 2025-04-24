import restoreIcon from "../../assets/icons/Restore-Icon.svg";
import { Button } from "../ui/Button";
import useAxiosApi from "../../utils/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdateNote } from "../../store/store";

interface RestoreNoteComponentProps {
  noteId: string;
  folderId: string;
}

export const RestoreNote = ({
  noteId,
  folderId,
}: RestoreNoteComponentProps) => {
  const axiosApi = useAxiosApi();
  const navigate = useNavigate();
  const setUpdateNote = useUpdateNote((state) => state.setUpdateNote);
  const restoreNoteClickedHandler = async () => {
    setUpdateNote(false);
    await axiosApi.patch(`/note/restore/${noteId}`);
    toast.success("Note restored");
    navigate(`/folder/${folderId}/note/${noteId}`);
    setUpdateNote(true);
  };
  return (
    <div className="grow flex justify-center items-center flex-col gap-y-4">
      <img className="w-24" src={restoreIcon} alt="Note icon" />
      <p className="text-white/60 font-light">
        Don't worry you can restore the note you just deleted, by clicking the
        below button.
      </p>
      <Button
        onClick={restoreNoteClickedHandler}
        size="md"
        text="Restore"
        variant="secondary"
      />
    </div>
  );
};
