import { create } from "zustand";

type UpdateNoteStore = {
  updateNote: boolean;
  setUpdateNote: (updateNoteStatus: boolean) => void;
};

type UpdateFolderStore = {
  updateFolder: boolean;
  setUpdateFolder: (updateFolderStatus: boolean) => void;
};

const useUpdateNote = create<UpdateNoteStore>((set) => ({
  updateNote: false,
  setUpdateNote: (updateNoteStatus: boolean) =>
    set({ updateNote: updateNoteStatus }),
}));

const useUpdateFolder = create<UpdateFolderStore>((set) => ({
  updateFolder: false,
  setUpdateFolder: (updateFolderStatus: boolean) =>
    set({ updateFolder: updateFolderStatus }),
}));

export { useUpdateNote, useUpdateFolder };
