import { useNavigate } from "react-router-dom";

interface ExtraFolderItemsCompopnentProps {
  folderName: string;
  image: string;
  brightIcon: string;
  openedFolder: string;
}

export const ExtraFolderItems = ({
  folderName,
  image,
  brightIcon,
  openedFolder,
}: ExtraFolderItemsCompopnentProps) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/folder/${folderName}`);
  };
  return (
    <li
      onClick={onClickHandler}
      className="flex justify-between items-center gap-x-6 cursor-pointer"
    >
      <img
        src={openedFolder === folderName ? brightIcon : image}
        alt="trash icon"
      />
      <span
        className={`grow ${
          openedFolder === folderName ? "text-white" : "text-white/60"
        }`}
      >
        {folderName}
      </span>
    </li>
  );
};
