import noteIcon from "../../assets/icons/Page-Icon.svg";

export const NoteInitial = () => {
  return (
    <div className="grow flex justify-center items-center flex-col gap-y-4">
      <img className="w-24" src={noteIcon} alt="Note icon" />
      <p className="text-white/60 font-light">
        Open a note to view it's content and edit it.
      </p>
    </div>
  );
};
