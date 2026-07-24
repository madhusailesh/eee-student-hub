import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No Resources",
  description = "Nothing uploaded yet.",
}) {
  return (
    <div className="rounded-xl border border-dashed py-16 text-center">
      <FolderOpen
        className="mx-auto mb-4 text-gray-400"
        size={60}
      />

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>
    </div>
  );
}