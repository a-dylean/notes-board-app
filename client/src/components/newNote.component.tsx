"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL, api } from "@/app/api/axios";
import { TextArea } from "@/app/ui/inputs/textarea.component";
import { DeleteButton } from "@/app/ui/buttons/delete.button";
import { SaveButton } from "@/app/ui/buttons/save.button";
import { Card } from "./card.component";

export const NewNote = () => {
  const [key, setKey] = useState(crypto.randomUUID());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { mutate: addNote } = useMutation({
    mutationFn: async () =>
      await api.post(`${BASE_URL}/notes`, { title, content }),
    onSuccess: () => {
      clearInput();
      queryClient.invalidateQueries(["notes"]);
    },
  });
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  const clearInput = () => {
    setTitle("");
    setContent("");
    setKey(crypto.randomUUID());
  };
  return (
    <div className="flex-0">
      <Card
        key={key}
        title={
          <TextArea
            value={title}
            placeholder="Enter title"
            onChange={handleTitleChange}
          />
        }
        content={<TextArea value={content} onChange={handleContentChange} />}
        button={
          (title.length > 0 || content.length > 0) && (
            <SaveButton addNote={addNote} />
          )
        }
        deleteButton={<DeleteButton deleteFunction={clearInput} />}
      />
    </div>
  );
};
