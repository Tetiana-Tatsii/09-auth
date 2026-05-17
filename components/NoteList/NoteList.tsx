"use client";

import React from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    deleteMutation.mutate(id);
  };

  if (!notes || notes.length === 0) {
    return <p>Немає нотаток.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {notes.map((note) => (
        <Link
          href={`/notes/${note.id}`}
          key={note.id}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <h3 style={{ margin: "0 0 8px 0" }}>{note.title}</h3>
          <p style={{ margin: "0 0 8px 0", color: "#555" }}>{note.content}</p>
          <span
            style={{
              fontSize: "12px",
              background: "#eee",
              padding: "4px 8px",
              borderRadius: "12px",
            }}
          >
            {note.tag}
          </span>

          <div style={{ marginTop: "16px" }}>
            <button
              onClick={(e) => handleDelete(e, note.id)}
              disabled={deleteMutation.isPending}
              style={{
                color: "red",
                border: "1px solid red",
                background: "transparent",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Видалити
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
