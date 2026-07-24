import ResourcePage from "@/components/resources/ResourcePage";

export default async function SyllabusPage({ params }) {
  const { semester, subjectCode } = await params;

  return (
    <ResourcePage
    title="Syllabus"
    type="syllabus"
    semester={semester}
    subject={subjectCode}
/>
  );
}
