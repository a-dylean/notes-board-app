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

export const UserNote = ({ id, title, content, created, edited }: Note) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const time = new Date(edited ? edited : created).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const queryClient = useQueryClient();

  const { mutate: updateNote, isLoading: updateLoading } = useMutation({
    mutationFn: async () =>
      await api.put(`notes/${id}`, { title: newTitle, content: newContent }),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const { mutate: deleteNote, isLoading } = useMutation({
    mutationFn: async () =>
      await axios.delete(`http://localhost:5000/notes/${id}`),
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
    <div
      className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4"
      // style={{
      //   backgroundColor: getRandomColor().backgroundColor
      // }}
    >
      <div>
        {editMode ? (
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b  w-full border-gray-400 mb-6 py-1 px-1">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder={title}
                value={newTitle}
                aria-label="Note title"
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <textarea
              className="h-full min-h-[100px] w-full resize-none border-transparent"
              placeholder="Write your thoughts here..."
              value={newContent}
              onChange={handleTextAreaChange}
              disabled={isLoading}
            ></textarea>
          </form>
        ) : (
          <div>
            <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
              {title}
            </h4>
            <p className="text-gray-800 dark:text-gray-100 text-sm ">
              {content}
            </p>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm">Last edited: {time}</p>
          {editMode ? (
            <button
              type="button"
              onClick={() => {
                updateNote();
                setEditMode(false);
              }}
            >
              <SaveIcon />
            </button>
          ) : (
            <button onClick={() => setEditMode(true)}>
              <EditIcon />
            </button>
          )}
          <button type="button" onClick={() => deleteNote()}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
