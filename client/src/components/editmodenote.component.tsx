"use client";
import { api } from "@/app/api/actions";
import { getRandomColor } from "../app/getRandomColor";
import { Note } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { TrashIcon } from "../app/ui/icons/trash.icon";
import { EditIcon } from "@/app/ui/icons/edit.icon";
import { SaveIcon } from "@/app/ui/icons/save.icon";

export const EditMode = ({ id, title, content, setEditMode }: any) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const queryClient = useQueryClient();

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
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  return (
    <div className="flex items-start flex-col justify-between w-full">
      <div className="flex items-start justify-between w-full min-h-[32px]">
        <input
          id="title"
          className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none font-bold"
          type="text"
          placeholder={title}
          value={newTitle}
          aria-label="Note title"
          onChange={handleInputChange}
          autoFocus
        />
        <button
          type="button"
          onClick={() => {
            updateNote();
            setEditMode(false);
          }}
        >
          <SaveIcon />
        </button>
      </div>
      <textarea
        className="h-full min-h-[100px] w-full border-transparent bg-transparent resize-none border-none appearance-none overflow-hidden shadow-none focus:border-transparent focus:ring-0 focus:outline-none"
        placeholder="Write your thoughts here..."
        value={newContent}
        onChange={handleTextAreaChange}
      ></textarea>
    </div>
  );
};
