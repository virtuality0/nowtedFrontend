import { folder } from "./folder";

export type note = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  content: string;
  folderId: string;
  preview?: string;
  folder?: folder;
  isDeleted: boolean;
  isFavorite: boolean;
  isArchived: boolean;
};
