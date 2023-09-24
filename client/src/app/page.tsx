"use client"
import ListNotes from "@/components/listnotes.component";
import { DefaultNote } from "../components/defaultnote.component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>

          <ListNotes />
          {/* */}
      </QueryClientProvider>
    </main>
  );
}
