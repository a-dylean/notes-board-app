"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../../appconfig";
import { api } from "@/app/api/actions";

export const DefaultNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const {mutate: addNote, isLoading} = useMutation({
    mutationFn: async () => await api.post(`${BASE_URL}/notes`, {title, content}),
    onSuccess: () => {
      setTitle("")
      setContent("")
      queryClient.invalidateQueries(['notes'])
    }
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const clearInput = () => {
    setTitle("");
    setContent("");
  }
  return (

      <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
        <div>
          {/* <form className="w-full max-w-sm" > */}
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
          {/* </form> */}
          {/* <form> */}
            <textarea
              className="h-full min-h-[100px] w-full resize-none border-transparent"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={handleTextAreaChange}
              disabled={isLoading}
            ></textarea>
          {/* </form> */}
          {/* <p className="text-gray-800 dark:text-gray-100 text-sm "></p> */}
        </div>
          <div className="flex items-center text-gray-800 dark:text-gray-100">
            <button type="button" onClick={()=>addNote()}>
              <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-check"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
              </div>
            </button>
            <button type="button" onClick={clearInput}>
            <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </div></button>
          </div>
      </div>
  );
};
