import ResourceCard from "./ResourceCard";

export default function ResourceGrid({ resources }) {
  if (!resources.length) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Resources Found
        </h2>

        <p className="mt-2 text-gray-500">
          No files are available for this section.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard
          key={resource._id}
          resource={resource}
        />
      ))}
    </div>
  );
}