"use client"
import { Note } from "@prisma/client";
import React, { cache, use, useEffect, useState } from "react";
import { UserNote } from "./note.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function ListNotes() {
const queryClient = useQueryClient();
const {data, isLoading, isError} = useQuery({
  queryKey: ["notes"],
  queryFn: async () => {
    const { data } = await axios.get("http://localhost:5000/notes");
    return data as Note[];
  }
})

if (isLoading) return <div>Loading...</div>
if(isError) return <div>Some error</div>
  return (
    <div>
      {data.map((note) => (
        <div key={note.id}>
          <UserNote {...note} />
        </div>
      ))}
    </div>
  );
}
