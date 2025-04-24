import { useNavigate, useParams } from "react-router-dom";
import useAxiosApi from "../../utils/axiosClient";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { NoteOpen } from "./NoteOpen";
import { useEffect, useRef, useState } from "react";
import { NoteInitial } from "./NoteInitial";
import { RestoreNote } from "./RestoreNote";

export const Main = () => {
  const navigate = useNavigate();
  const axiosApi = useAxiosApi();
  const params = useParams();
  const noteId = params.noteId;
  const folderId = params.folderId;
  const [noteState, setNoteState] = useState<"initial" | "opened" | "deleted">(
    "initial"
  );
  const noteIdRef = useRef(noteId);

  const signOutHandler = () => {
    axiosApi
      .post("/user/signout")
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        toast("Something went wrong!");
      });
  };

  useEffect(() => {
    if (noteId) {
      setNoteState("opened");
      noteIdRef.current = noteId;
    }
  }, [noteId]);

  return (
    <div className="flex flex-col grow px-4 py-4 gap-y-2">
      <div className="flex gap-x-4 justify-end px-2 py-1">
        <Button
          onClick={signOutHandler}
          size="md"
          variant="secondary"
          text="Sign Out"
        />
      </div>
      {noteState === "initial" && <NoteInitial />}
      {noteState === "opened" && <NoteOpen setNoteState={setNoteState} />}
      {noteState === "deleted" && (
        <RestoreNote
          noteId={noteIdRef.current ?? ""}
          folderId={folderId ?? ""}
        />
      )}
    </div>
  );
};
