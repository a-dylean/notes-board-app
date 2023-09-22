import { DefaultNote } from "./defaultNote";
import { Note } from "./note";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const notes = await prisma.note.findMany();
  return (
    <main>
      <div>
        <div className="mx-auto container py-20 px-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <DefaultNote/>
            {notes.map((note) => (
              <div key={note.id}><Note note={note}/></div>
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
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
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
