export const getRandomColor = () => {
  const colors = [
    { backgroundColor: "white"},
    { backgroundColor: "#93C5FD"},
    { backgroundColor: "white"},
    { backgroundColor: "#FACC15"},
    { backgroundColor: "#FCA5A5"},
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
