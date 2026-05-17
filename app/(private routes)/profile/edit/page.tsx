"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { updateProfile } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.push("/profile");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;

    mutation.mutate({ username });
  };

  const avatarSrc =
    user?.avatar ||
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return (
    <main
      style={{ padding: "32px", display: "flex", justifyContent: "center" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Edit Profile</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            priority
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500 }}>
            Email (Read-only)
          </label>
          <input
            type="email"
            defaultValue={user?.email || ""}
            readOnly
            disabled
            style={{
              padding: "8px 12px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              backgroundColor: "#e9ecef",
              cursor: "not-allowed",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500 }}>Username</label>
          <input
            type="text"
            name="username"
            defaultValue={user?.username || ""}
            style={{
              padding: "8px 12px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <button
            type="button"
            onClick={() => router.push("/profile")}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#0d6efd",
              color: "#fff",
              cursor: mutation.isPending ? "not-allowed" : "pointer",
            }}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
}
