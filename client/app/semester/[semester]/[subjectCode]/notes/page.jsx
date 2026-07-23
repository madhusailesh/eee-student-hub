import { getResources } from "@/services/resources";
import { FileText, Download } from "lucide-react";

export default async function NotesPage({ params }) {
  const { semester, subjectCode } = await params;

  const notes = await getResources({
    semester,
    subjectCode,
    type: "notes",
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Notes
      </h1>

      <div className="space-y-4">

        {notes.map((note) => (
          <div
            key={note._id}
            className="flex items-center justify-between rounded-xl border p-5"
          >

            <div className="flex items-center gap-4">

              <FileText />

              <div>
                <h2 className="font-semibold">
                  {note.title}
                </h2>

                <p className="text-sm text-gray-500">
                  PDF
                </p>
              </div>

            </div>

            <a
              href={note.fileUrl}
              target="_blank"
              className="flex items-center gap-2 rounded-lg bg-black text-white px-4 py-2"
            >
              <Download size={18} />

              Download
            </a>

          </div>
        ))}

      </div>

    </main>
  );
}