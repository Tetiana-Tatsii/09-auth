"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal>
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {isLoading && <div>Завантаження...</div>}
        {(isError || (!isLoading && !note)) && (
          <div style={{ color: "red" }}>Помилка завантаження.</div>
        )}

        {note && (
          <>
            <h2 style={{ marginTop: 0 }}>{note.title}</h2>
            <span
              style={{
                background: "#e9ecef",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "12px",
              }}
            >
              {note.tag}
            </span>
            <p
              style={{
                marginTop: "16px",
                maxHeight: "400px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {note.content}
            </p>
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              background: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            Закрити
          </button>
        </div>
      </div>
    </Modal>
  );
}
