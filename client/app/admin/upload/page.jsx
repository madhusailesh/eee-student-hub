"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

import { getSubjectsBySemester } from "@/services/subjects";
import { uploadResource } from "@/services/resources";

export default function UploadPage() {
  const fileRef = useRef(null);

  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("notes");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) {
      setSubjects([]);
      setSubject("");
      return;
    }

    async function loadSubjects() {
      try {
        const data = await getSubjectsBySemester(semester);
        setSubjects(data);
      } catch {
        toast.error("Failed to load subjects");
      }
    }

    loadSubjects();
  }, [semester]);

  const resetForm = () => {
    setSemester("");
    setSubjects([]);
    setSubject("");
    setType("notes");
    setTitle("");
    setDescription("");
    setFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!semester)
      return toast.error("Please select a semester.");

    if (!subject)
      return toast.error("Please select a subject.");

    if (!title.trim())
      return toast.error("Please enter a title.");

    if (!file)
      return toast.error("Please select a PDF file.");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("type", type);
    formData.append("file", file);

    try {
      setLoading(true);

      await uploadResource(formData);

      toast.success("Resource uploaded successfully.");

      resetForm();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-5">

      <div className="bg-white rounded-2xl shadow border p-8">

        <h1 className="text-3xl font-bold mb-8">
          Upload Resource
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 font-medium">
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Semester
              </option>

              {[1,2,3,4,5,6,7,8].map((sem)=>(
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Subject
            </label>

            <select
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              className="w-full border rounded-lg p-3"
              disabled={!semester}
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map((item)=>(
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.code} - {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Resource Type
            </label>

            <select
              value={type}
              onChange={(e)=>setType(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="notes">Notes</option>
              <option value="pyqs">PYQs</option>
              <option value="books">Books</option>
              <option value="videos">Videos</option>
              <option value="assignments">Assignments</option>
              <option value="syllabus">Syllabus</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter Title"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Description (Optional)"
              className="w-full border rounded-lg p-3 resize-none"
            />
          </div>

          <div>

            <label className="block mb-2 font-medium">
              Upload PDF
            </label>

            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">

              <UploadCloud
                className="w-10 h-10 text-blue-600 mb-3"
              />

              <p className="font-medium">
                Click to choose PDF
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Maximum size 20 MB
              </p>

              {file && (
                <p className="mt-3 text-green-600 font-medium">
                  {file.name}
                </p>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e)=>setFile(e.target.files[0])}
              />

            </label>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Uploading..."
              : "Upload Resource"}
          </button>

        </form>

      </div>

    </main>
  );
}