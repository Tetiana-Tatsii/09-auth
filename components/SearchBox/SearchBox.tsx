"use client";

import React from "react";

export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Пошук нотаток..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "10px 16px",
        border: "1px solid #ced4da",
        borderRadius: "6px",
        width: "100%",
        maxWidth: "300px",
        fontSize: "16px",
      }}
    />
  );
}
