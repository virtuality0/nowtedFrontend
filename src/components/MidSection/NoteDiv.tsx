import { useNavigate } from "react-router-dom";

interface NoteComponentProps {
  createdAt: string;
  title: string;
  noteId: string;
  preview: string;
  folderId: string;
}

export const NoteDiv = ({
  createdAt,
  title,
  preview,
  noteId,
  folderId,
}: NoteComponentProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/folder/${folderId}/note/${noteId}`);
      }}
      key={noteId}
      className="flex flex-col gap-y-2 bg-gray-600 px-2 py-4 rounded-md cursor-pointer h-[7rem] shrink-0"
    >
      <h1 className="text-white font-medium truncate">{title}</h1>
      <span className="text-white/60">{preview}</span>
      <span className="text-white/60 text-sm">
        {new Date(createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};
