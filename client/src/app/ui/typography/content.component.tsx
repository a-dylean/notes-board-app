export const Content = ({ content }: any) => {
  return (
    <p
      className="text-gray-800 dark:text-gray-100 whitespace-pre-line flex-1 max-h-[250px] overflow-y-auto
     "
    >
      {content.length > 0 ? content : "No content"}
    </p>
  );
};
