export const Title = ({ title }: any) => {
  return (
    <h4 className="text-gray-800 dark:text-gray-100 font-bold overflow-y-hidden">
      {title.length > 0 ? title : "No title"}
    </h4>
  );
};
