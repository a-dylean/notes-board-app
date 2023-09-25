"use client";
import { api } from "@/app/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "./card.component";
import { Title } from "@/app/ui/typography/title.component";
import { Content } from "@/app/ui/typography/content.component";
import { EditButton } from "@/app/ui/buttons/edit.button";
import { Footer } from "@/app/ui/typography/footer.component";
import { DeleteButton } from "@/app/ui/buttons/delete.button";
import { Note } from "@prisma/client";
import { TextArea } from "@/app/ui/inputs/textarea.component";

export const UserNote = ({ id, title, content, created, edited }: Note) => {
  const [editMode, setEditMode] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteNote } = useMutation({
    mutationFn: async () => await api.delete(`notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const { mutate: updateNote, isLoading } = useMutation({
    mutationFn: async () =>
      await api.put(`notes/${id}`, {
        title: newTitle,
        content: newContent,
        edited: new Date(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
  const handleContentChange = (newContent: string) => {
    setNewContent(newContent);
  };
  const handleTitleChange = (newTitle: string) => {
    setNewTitle(newTitle);
  };
  return (
    <Card
      title={
        editMode ? (
          <TextArea
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
        ) : (
          <Title title={title} />
        )
      }
      content={
        editMode ? (
          <TextArea value={content} onChange={handleContentChange} />
        ) : (
          <Content content={content} />
        )
      }
      button={
        <EditButton
          editMode={editMode}
          setEditMode={setEditMode}
          updateNote={updateNote}
        />
      }
      edited={<Footer created={created} edited={edited} />}
      deleteButton={<DeleteButton deleteFunction={deleteNote} />}
    />
  );
};
