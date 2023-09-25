export const Note = ({title, text, button}: any) => {
return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 py-5 px-4">
    <div className="flex items-start justify-between w-full min-h-[32px]">
      {title}
    </div>
    {text}
<div className="flex items-center text-gray-800 dark:text-gray-100">
  {button}
</div>
</div>
)
}