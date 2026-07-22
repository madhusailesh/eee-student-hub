"use client";

import { useEffect, useState } from "react";
import { getSubjectsBySemester } from "@/services/subjects";
import { uploadResource } from "@/services/upload";
import { toast } from "sonner";

export default function UploadPage() {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("notes");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!semester) return;

    async function load() {
      try {
        const data = await getSubjectsBySemester(semester);
        setSubjects(data);
      } catch {
        toast.error("Failed to load subjects");
      }
    }

    load();
  }, [semester]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.error("Please choose a PDF");
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      await uploadResource(type, formData);

      toast.success("Uploaded Successfully");

      setTitle("");
      setDescription("");
      setSemester("");
      setSubject("");
      setSubjects([]);
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload Failed");
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-8">
        Upload Resource
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Choose Semester</option>

          {[1,2,3,4,5,6,7,8].map((s)=>(
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Choose Subject
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

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e)=>setFile(e.target.files[0])}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Upload
        </button>

      </form>

    </main>
  );
}