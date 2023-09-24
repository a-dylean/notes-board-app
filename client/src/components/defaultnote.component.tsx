"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../appconfig";
import { api } from "@/app/api/actions";
import { SaveIcon } from "@/app/ui/icons/save.icon";
import { TrashIcon } from "@/app/ui/icons/trash.icon";

export const DefaultNote = () => {
  const [title, setTitle] = useState("hello");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { mutate: addNote, isLoading } = useMutation({
    mutationFn: async () =>
      await api.post(`${BASE_URL}/notes`, { title, content }),
    onSuccess: () => {
      setTitle("");
      setContent("");
      queryClient.invalidateQueries(["notes"]);
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const clearInput = () => {
    setTitle("");
    setContent("");
  };
  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b  w-full border-gray-400 mb-6 py-1 px-1">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
              type="text"
              placeholder="New note"
              aria-label="Note title"
              value={title}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <textarea
            className="h-full min-h-[100px] w-full resize-none border-transparent"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={handleTextAreaChange}
            disabled={isLoading}
          ></textarea>
        </form>
      </div>
      <div className="flex items-center text-gray-800 dark:text-gray-100">
        <button type="button" onClick={() => addNote()}>
          <SaveIcon />
        </button>
        <button type="button" onClick={clearInput}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
