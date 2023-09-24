import { Note } from "@prisma/client";

export const getNotes = async () => {
    try {
        const res = await fetch("http://localhost:5000/notes");
        return res.json();
      } catch (err) {
        console.error(err)
      }
}