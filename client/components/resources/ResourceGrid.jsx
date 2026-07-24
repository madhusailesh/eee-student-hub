"use client";

import ResourceCard from "./ResourceCard";
import EmptyState from "./EmptyState";

export default function ResourceGrid({ resources = [] }) {
  if (!resources.length) {
    return (
      <EmptyState
        title="No Resources Found"
        description="No files are available for this section."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource._id || index}
          resource={resource}
          index={index}
        />
      ))}
    </div>
  );
}