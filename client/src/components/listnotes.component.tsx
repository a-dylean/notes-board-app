"use client";
import React from "react";
import { UserNote } from "./usernote.component";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/actions";
import { Note } from "@prisma/client";
import { BASE_URL } from "../../appconfig";
import { DefaultNote } from "./defaultnote.component";

export default function ListNotes() {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await api.get(`${BASE_URL}/notes`);
      return data as Note[];
    },
  });

  if (isLoading)
    return (
      <div>
        <div className="mx-auto container py-20 px-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded break-words">
            <DefaultNote />
            <div className="flex items-start justify-center">
              <p>Previous notes are loading...&nbsp;</p>
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  if (isError) return <div>Some error</div>;
  return (
    <div>
      <div className="mx-auto container py-20 px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded break-words">
          <DefaultNote />
          {notes.length > 0 &&
            notes.map((note) => (
              <div key={note.id}>
                <UserNote {...note} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
