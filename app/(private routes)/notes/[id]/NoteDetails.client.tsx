"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetailsClient({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div style={{ padding: "24px" }}>Завантаження...</div>;
  if (isError || !note)
    return (
      <div style={{ padding: "24px", color: "red" }}>
        Помилка завантаження нотатки.
      </div>
    );

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px" }}>{note.title}</h1>
      <span
        style={{
          background: "#e9ecef",
          padding: "4px 12px",
          borderRadius: "16px",
          fontSize: "14px",
        }}
      >
        {note.tag}
      </span>
      <p
        style={{ marginTop: "24px", whiteSpace: "pre-wrap", lineHeight: "1.6" }}
      >
        {note.content}
      </p>
    </div>
  );
}
