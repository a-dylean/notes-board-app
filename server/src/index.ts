import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { FRONTEND_ORIGIN } from "./config";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [FRONTEND_ORIGIN],
    allowedHeaders: ["authorization", "content-type", "cookies"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/notes", async (req, res) => {
  const notes = await prisma.note.findMany({
    orderBy: {
      created: "desc",
    },
  });
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = await prisma.note.create({
    data: { title, content },
  });
  res.json(note);
});

app.get("/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const id = parseInt(noteId);
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });
  res.json(note);
});

app.put("/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const id = parseInt(noteId);
  const note = await prisma.note.update({
    where: { id },
    data: req.body,
  });
  res.json(note);
});

app.delete("/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const id = parseInt(noteId);
  const note = await prisma.note.delete({
    where: {
      id,
    },
  });
  res.json(note);
});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
