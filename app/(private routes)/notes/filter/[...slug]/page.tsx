import NotesClient from "./Notes.client";

// Типізуємо params як Promise, як того вимагає новий Next.js
export default async function FilterSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;

  // Якщо URL виглядає як /notes/filter/react, то тег буде "react"
  const tag =
    resolvedParams.slug && resolvedParams.slug.length > 0
      ? resolvedParams.slug[0]
      : "";

  return (
    <main style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>
        {tag ? `Нотатки за тегом: #${tag}` : "Усі нотатки"}
      </h1>
      <NotesClient initialTag={tag} />
    </main>
  );
}
