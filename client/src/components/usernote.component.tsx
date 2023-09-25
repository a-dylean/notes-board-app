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
import { EditMode } from "./editmodenote.component";

export const UserNote = ({ id, title, content, created, edited }: Note) => {
  const [editMode, setEditMode] = useState(false);
  const time = new Date(edited ? edited : created).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const queryClient = useQueryClient();

  const { mutate: deleteNote, isLoading } = useMutation({
    mutationFn: async () =>
      await axios.delete(`http://localhost:5000/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  return (
    <div
      className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 py-5 px-4"
      // style={{
      //   backgroundColor: getRandomColor().backgroundColor
      // }}
    >
      {editMode ? (
        <EditMode
          id={id}
          title={title}
          content={content}
          setEditMode={setEditMode}
        />
      ) : (
          <div className="flex items-start flex-col justify-between w-full">
            <div className="flex items-start justify-between w-full">
              <h4 className="text-gray-800 dark:text-gray-100 font-bold">
                {title.length > 0 ? title : "No title"}
              </h4>
              <button onClick={() => setEditMode(true)}>
                <EditIcon />
              </button>
            </div>
              <p className="text-gray-800 dark:text-gray-100">
                {content.length > 0 ? content : "No content"}
              </p>
          </div>
      )}
      <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
        <p className="text-sm">Last edited: {time}</p>
        <div className="float-right">
          <button type="button" onClick={() => deleteNote()}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
