import React, { ReactNode } from "react";

interface CardProps {
  title: ReactNode;
  content: ReactNode;
  button: ReactNode;
  edited?: ReactNode;
  deleteButton?: ReactNode;
}

export const Card = ({
  title,
  content,
  button,
  edited,
  deleteButton,
}: CardProps) => {
  return (
    <div className="w-[350px] min-h-[250px] flex flex-col dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 py-5 px-4 gap-4">
      <div className="w-full flex-1 flex flex-col gap-4">
        <div className="flex items-start justify-between w-full min-h-[32px] gap-2 h-max-[64px]">
          {title}
          {button}
        </div>
        <div className="flex flex-1">{content}</div>
      </div>
      <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
        {edited}
        <div className="block ml-auto mr-0">{deleteButton}</div>
      </div>
    </div>
  );
};
