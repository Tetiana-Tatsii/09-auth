import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getNoteByIdServer } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

// 1. Компонент типізовано для прийому params як Promise<{ id: string }>
export default async function NoteIdModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 2. Чекаємо на params (вимога Next.js 15+)
  const { id } = await params;

  const queryClient = new QueryClient();

  // 3. Дані отримуються за допомогою функції з serverApi та React Query prefetchQuery
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteByIdServer(id),
  });

  // 4. Клієнтський компонент рендериться всередині HydrationBoundary
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
