export const Loader = () => {
  return (
    <div className="flex items-start justify-center">
      <p>Notes are loading...&nbsp;</p>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};
