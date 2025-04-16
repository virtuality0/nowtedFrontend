import { useState } from "react";
import { Main } from "./MainSection/Main";
import { Notes } from "./MidSection/Notes";
import { Sidebar } from "./Sidebar/Sidebar";

export const Dashboard = () => {
  const [addNoteClicked, setAddNoteClicked] = useState<boolean>(false);
  const [noteUpdated, setNoteUpdated] = useState<boolean>(false);
  return (
    <div className="flex h-full">
      <Sidebar
        addNoteClicked={addNoteClicked}
        setAddNoteClicked={setAddNoteClicked}
        noteUpdated={noteUpdated}
      />
      <Notes addNoteClicked={addNoteClicked} noteUpdated={noteUpdated} />
      <Main setNoteUpdated={setNoteUpdated} />
    </div>
  );
};
