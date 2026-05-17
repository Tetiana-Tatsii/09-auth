"use client";

import React from "react";

// Явно вказуємо типи прямо в дужках!
export default function Pagination({
  currentPage,
  onPageChange,
}: {
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #ced4da",
          background: currentPage <= 1 ? "#f8f9fa" : "#fff",
          cursor: currentPage <= 1 ? "not-allowed" : "pointer",
          color: currentPage <= 1 ? "#6c757d" : "#212529",
        }}
      >
        Попередня
      </button>

      <span style={{ fontWeight: 500 }}>Сторінка {currentPage}</span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #ced4da",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Наступна
      </button>
    </div>
  );
}
