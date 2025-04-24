import trashIcon from "../../assets/icons/Trash-Icon.svg";
import archivedIcon from "../../assets/icons/Archive-Icon.svg";
import favoriteIcon from "../../assets/icons/Favourites-Icon.svg";
import brightTrashIcon from "../../assets/icons/Trash-Bright-Icon.svg";
import brightFavoriteIcon from "../../assets/icons/Favourites-Bright-Icon.svg";
import brightArchiveIcon from "../../assets/icons/Archive-Bright-Icon.svg";
import { ExtraFolderItems } from "./ExtraFolderItems";

interface ExtraFoldersComponentProps {
  openedFolder: string;
}

export const ExtraFolders = ({ openedFolder }: ExtraFoldersComponentProps) => {
  return (
    <div className="flex flex-col gap-y-4 px-2 py-1">
      <h1 className="text-white/60 text-sm">Extras</h1>
      <ExtraFolderItems
        folderName="Trash"
        image={trashIcon}
        brightIcon={brightTrashIcon}
        openedFolder={openedFolder}
      />
      <ExtraFolderItems
        folderName="Archived"
        image={archivedIcon}
        brightIcon={brightArchiveIcon}
        openedFolder={openedFolder}
      />
      <ExtraFolderItems
        folderName="Favorites"
        image={favoriteIcon}
        brightIcon={brightFavoriteIcon}
        openedFolder={openedFolder}
      />
    </div>
  );
};
