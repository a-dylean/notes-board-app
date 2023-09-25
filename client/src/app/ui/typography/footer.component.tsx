export const Footer = ({ created, edited }: any) => {
  const time = new Date(edited ? edited : created).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return <p className="text-sm">Last edited: {time}</p>;
};
