import { create } from "zustand";

interface DraftNote {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draftNote: DraftNote;
  setDraftNote: (note: Partial<DraftNote>) => void;
  clearDraftNote: () => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  draftNote: { title: "", content: "", tag: "" },

  setDraftNote: (note) =>
    set((state) => ({ draftNote: { ...state.draftNote, ...note } })),

  clearDraftNote: () => set({ draftNote: { title: "", content: "", tag: "" } }),
}));
