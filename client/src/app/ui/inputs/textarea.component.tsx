import { ChangeEvent, useState } from "react";

export const TextArea = ({
  value,
  onChange,
  placeholder = "Write your thoughts here",
}: any) => {
  const [currentValue, setCurrentValue] = useState(value);
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(event.target.value);
    onChange(event.target.value);
  };
  const setCarretAtEnd = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempValue = event.target.value;
    event.target.value = "";
    event.target.value = tempValue;
    event.target.scrollTop = event.target.scrollHeight;
  };
  return (
    <textarea
      className="w-full flex-1 border-transparent bg-transparent resize-none border-none appearance-none shadow-none focus:border-transparent focus:ring-0 text-overflow-visible focus:outline-none"
      placeholder={placeholder}
      aria-label="Note text"
      value={currentValue}
      autoFocus
      onFocus={setCarretAtEnd}
      onChange={handleOnChange}
    />
  );
};
