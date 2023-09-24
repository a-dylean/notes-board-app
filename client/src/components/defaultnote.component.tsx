"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../appconfig";
import { api } from "@/app/api/actions";
import { SaveIcon } from "@/app/ui/icons/save.icon";
import { TrashIcon } from "@/app/ui/icons/trash.icon";
import { AddIcon } from "@/app/ui/icons/add.icon";

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
    <div className="w-full h-64 flex justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
        <form className="w-full max-w-sm mr-2">
          <div className="flex flex-col items-start justify-between w-full ">
            <div className="flex items-center border-b  w-full border-gray-400   mb-6 py-1 px-1">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none mr-2"
                type="text"
                placeholder="New note"
                aria-label="Note title"
                value={title}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div><textarea
            className="h-full min-h-[100px] w-full resize-none border-transparent"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={handleTextAreaChange}
            disabled={isLoading}
          ></textarea></div></form>
            <div className="flex flex-col justify-between items-center">
              <button type="button" onClick={() => addNote()}>
                <AddIcon />
              </button>
              <button type="button" onClick={clearInput}>
                <TrashIcon />
              </button>
            </div>
          
          
        
    </div>
  );
};
