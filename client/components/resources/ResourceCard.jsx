"use client";

import Link from "next/link";
import { FileText, Eye, Download, Calendar } from "lucide-react";

export default function ResourceCard({ resource }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-blue-100 p-3">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{resource.title}</h3>

          {resource.description && (
            <p className="mt-1 text-sm text-gray-600">
              {resource.description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            {new Date(resource.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={resource.fileUrl}
          target="_blank"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Eye size={18} />
          View
        </Link>

        <a
          href={resource.fileUrl}
          download
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          <Download size={18} />
          Download
        </a>
      </div>
    </div>
  );
}