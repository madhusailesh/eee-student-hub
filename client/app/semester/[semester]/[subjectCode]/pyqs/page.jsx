import ResourcePage from "@/components/resources/ResourcePage";

export default async function PYQsPage({ params }) {

  const { semester, subjectCode } = await params;

  return (
    <ResourcePage
      title="Previous Year Questions"
      type="pyqs"
      semester={semester}
      subject={subjectCode}
    />
  );
}