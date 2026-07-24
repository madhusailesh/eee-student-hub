export default function FacultyCard({ teacher }) {
  const imageUrl = teacher.photoUrl.startsWith("http")
    ? teacher.photoUrl
    : `http://localhost:5000${teacher.photoUrl}`;

  // console.log(teacher.photoUrl);
  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <img
        src={imageUrl}
        alt={teacher.name}
        className="w-36 h-36 rounded-full object-cover mx-auto"
      />

      <h2 className="text-xl font-bold text-center mt-4">{teacher.name}</h2>

      <p className="text-center text-blue-600">{teacher.designation}</p>

      <p className="text-center">{teacher.branch}</p>

      <p className="text-center text-sm mt-3">{teacher.email}</p>

      <p className="text-center text-sm">{teacher.phone}</p>

      <p className="text-center text-sm">Cabin: {teacher.cabin}</p>
    </div>
  );
}
