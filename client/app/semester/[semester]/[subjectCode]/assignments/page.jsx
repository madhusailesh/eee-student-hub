import ResourcePage from "@/components/resources/ResourcePage";

export default async function AssignmentsPage({ params }) {

  const { semester, subjectCode } = await params;

  return (
    <ResourcePage
    title="Assignments"
    type="assignments"
    semester={semester}
    subject={subjectCode}
/>
  );
}