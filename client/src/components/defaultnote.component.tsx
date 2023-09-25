"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../appconfig";
import { api } from "@/app/api/actions";
import { TrashIcon } from "@/app/ui/icons/trash.icon";
import { SaveIcon } from "@/app/ui/icons/save.icon";

export const DefaultNote = () => {
  const [title, setTitle] = useState("");
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
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 py-5 px-4">
          <div className="flex items-start justify-between w-full min-h-[32px]">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none font-bold"
              type="text"
              placeholder="New note"
              aria-label="Note title"
              value={title}
              onChange={handleInputChange}
            />
          {(title.length || content.length > 0) && <button
            type="button"
            onClick={() => addNote()}
            className="float-right flex justify-end mt-0 mr-0 ml-3 mb-1"
          >
            <SaveIcon />
          </button>}
          </div>
          <textarea
            className="h-full min-h-[100px] w-full border-transparent bg-transparent resize-none border-none appearance-none overflow-hidden shadow-none focus:border-transparent focus:ring-0 focus:outline-none"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={handleTextAreaChange}
          ></textarea>
      <div className="flex items-center text-gray-800 dark:text-gray-100">
        <button type="button" onClick={clearInput} className="block ml-auto mr-0">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
