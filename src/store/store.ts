import { create } from "zustand";

type UpdateNoteStore = {
  updateNote: boolean;
  setUpdateNote: (updateNoteStatus: boolean) => void;
};

const useUpdateNote = create<UpdateNoteStore>((set) => ({
  updateNote: false,
  setUpdateNote: (updateNoteStatus: boolean) =>
    set({ updateNote: updateNoteStatus }),
}));

export { useUpdateNote };
