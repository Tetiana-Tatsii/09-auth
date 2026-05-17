"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/clientApi";

// Переконайся, що назва файлу зі стилями відповідає твоїй!
import css from "./EditProfilePage.module.css";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.push("/profile");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update profile.");
      } else {
        setError("An unexpected error occurred.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const avatar = formData.get("avatar") as string;

    mutation.mutate({ username, avatar });
  };

  return (
    <main className={css.mainContent}>
      {/* Використовуємо profileCard як обгортку для форми */}
      <form className={css.profileCard} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {/* Обгортка для полів */}
        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={user?.username || ""}
              className={css.input}
              required
            />
          </div>

          <div className={css.usernameWrapper}>
            <label htmlFor="avatar">Avatar URL</label>
            <input
              id="avatar"
              type="url"
              name="avatar"
              defaultValue={user?.avatar || ""}
              className={css.input}
              required
            />
          </div>
        </div>

        {error && (
          <p style={{ color: "#e00000", marginTop: "12px", fontSize: "14px" }}>
            {error}
          </p>
        )}

        {/* Блок з кнопками Save та Cancel */}
        <div className={css.actions}>
          <button
            type="submit"
            className={css.saveButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.push("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
