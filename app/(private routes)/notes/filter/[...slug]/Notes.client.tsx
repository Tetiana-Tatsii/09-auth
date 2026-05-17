"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

export default function NotesClient({
  initialTag = "",
}: {
  initialTag?: string;
}) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, page, tag: initialTag }],
    queryFn: () =>
      fetchNotes({ search: debouncedSearch, page, perPage, tag: initialTag }),
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <SearchBox value={search} onChange={setSearch} />

        <Link
          href="/notes/action/create"
          style={{
            padding: "10px 20px",
            background: "#0d6efd",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          + Створити нотатку
        </Link>
      </div>

      {isLoading && (
        <div style={{ padding: "20px 0" }}>Завантаження нотаток...</div>
      )}
      {isError && (
        <div style={{ padding: "20px 0", color: "red" }}>
          Помилка завантаження списку.
        </div>
      )}

      {!isLoading && !isError && <NoteList notes={notes} />}

      {!isLoading && !isError && notes.length > 0 && (
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination currentPage={page} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
