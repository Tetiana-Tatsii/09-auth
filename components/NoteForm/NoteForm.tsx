"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draftNote, setDraftNote, clearDraftNote } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Оновлюємо кеш після створення
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraftNote();
      router.back(); // Повертаємося на попередню сторінку
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draftNote);
  };

  const handleCancel = () => {
    clearDraftNote();
    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "500px",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={draftNote.title}
        onChange={(e) => setDraftNote({ title: e.target.value })}
        required
        style={{ padding: "8px" }}
      />
      <textarea
        placeholder="Content"
        value={draftNote.content}
        onChange={(e) => setDraftNote({ content: e.target.value })}
        required
        style={{ padding: "8px", minHeight: "100px" }}
      />
      <input
        type="text"
        placeholder="Tag"
        value={draftNote.tag}
        onChange={(e) => setDraftNote({ tag: e.target.value })}
        required
        style={{ padding: "8px" }}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={handleCancel}
          style={{ padding: "8px 16px" }}
        >
          Скасувати
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          style={{ padding: "8px 16px", background: "#0d6efd", color: "#fff" }}
        >
          {mutation.isPending ? "Створення..." : "Створити нотатку"}
        </button>
      </div>
    </form>
  );
}
