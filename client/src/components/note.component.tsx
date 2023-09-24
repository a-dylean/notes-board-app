'use client'
import { prisma } from "@/lib/prisma";
import { getRandomColor } from "../app/getRandomColor";
import { Note } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const UserNote = ({id, title,content, created, edited }: Note) => {
  const time = new Date(
    edited ? edited : created
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const updateNote = async () => {
    try {
      const res = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, content})
    })
  } catch (err) {
    console.error(err)
  }}

  const queryClient = useQueryClient();
  const {mutate: deleteNote, isLoading} = useMutation({
    mutationFn: async () => await axios.delete(`http://localhost:5000/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    }
  })
  return (
    <div className="rounded break-words">
      <div
        className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4"
        // style={{
        //   backgroundColor: getRandomColor().backgroundColor
        // }}
      >
        <div>
          <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
            {title}
          </h4>

          <p className="text-gray-800 dark:text-gray-100 text-sm ">
            {content}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
            <p className="text-sm">Last edited: {time}</p>
            <button onClick={updateNote}>
            <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-pencil"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
            </div>
            </button>
            <button type="button" onClick={() => deleteNote()}>
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
      </div>
    </div>
  );
};
