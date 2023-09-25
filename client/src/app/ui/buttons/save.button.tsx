export const SaveButton = ({ addNote }: any) => {
  return (
    <button
      type="button"
      onClick={() => addNote()}
      className="float-right flex justify-end mt-0 mr-0 ml-3 mb-1"
    >
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
  );
};
