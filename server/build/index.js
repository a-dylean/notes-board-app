"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const prisma = new client_1.PrismaClient();
app.get("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield prisma.note.findMany({
        orderBy: {
            created: "desc",
        },
    });
    res.json(notes);
}));
app.post("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const note = yield prisma.note.create({
        data: { title, content },
    });
    res.json(note);
}));
app.get("/notes/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const id = parseInt(noteId);
    const note = yield prisma.note.findUnique({
        where: {
            id,
        },
    });
    res.json(note);
}));
app.put("/notes/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const id = parseInt(noteId);
    const note = yield prisma.note.update({
        where: { id },
        data: req.body,
    });
    res.json(note);
}));
app.delete("/notes/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId } = req.params;
    const id = parseInt(noteId);
    const note = yield prisma.note.delete({
        where: {
            id,
        },
    });
    res.json(note);
}));
app.listen(5000, () => {
    console.log("Listening to port 5000");
});
