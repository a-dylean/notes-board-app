"use client";
import React from "react";
import { UserNote } from "./userNote";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/axios";
import { Note } from "@prisma/client";
import { BASE_URL } from "../../appconfig";
import { NewNote } from "./newNote.component";
import { Loader } from "./loader.component";
import { Error } from "./error.component";

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

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <Error />;
  } else {
    content = (
      <div className="flex flex-wrap gap-6">
        <NewNote />
        {notes.length > 0 &&
          notes.map((note) => (
            <div key={note.id}>
              <UserNote {...note} />
            </div>
          ))}
      </div>
    );
  }
  return <div className="mx-auto container py-20 px-6">{content}</div>;
}
