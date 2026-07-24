import ResourcePage from "@/components/resources/ResourcePage";

export default async function VideosPage({ params }) {
  const { semester, subjectCode } = await params;

  return (
    <ResourcePage
      title="Videos"
      type="videos"
      semester={semester}
      subject={subjectCode}
    />
  );
}
