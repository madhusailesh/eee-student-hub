import ResourcePage from "@/components/resources/ResourcePage";

export default async function BooksPage({ params }) {

  const { semester, subjectCode } = await params;

  return (
    <ResourcePage
      title="Books"
      type="books"
      semester={semester}
      subject={subjectCode}
    />
  );
}