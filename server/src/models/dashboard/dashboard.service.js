const Resource = require("../resource/resource.model"); // 👈 Use Resource model instead of Note/Pyq
const Subject = require("../subjects/subject.model");
const Faculty = require("../faculty/faculty.model");
const Notice = require("../notice/notice.model");
const Timetable = require("../timetable/timetable.model");

const getDashboard = async () => {
  const [
    notes,
    pyqs,
    subjects,
    faculty,
    notices,
    timetables,
    latestNotices,
    latestNotes,
  ] = await Promise.all([
    // 🔴 Count using Resource model with respective 'type'
    Resource.countDocuments({ type: "notes" }),
    Resource.countDocuments({ type: "pyqs" }),
    Subject.countDocuments({}),
    Faculty.countDocuments({}),
    Notice.countDocuments({}),
    Timetable.countDocuments({}),

    // Latest Notices
    Notice.find({})
      .sort({ createdAt: -1 })
      .limit(5),

    // 🔴 Fetch latest notes from Resource collection where type is 'notes'
    Resource.find({ type: "notes" })
      .populate("subject", "name code")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return {
    statistics: {
      notes,
      pyqs,
      subjects,
      faculty,
      notices,
      timetables,
    },
    latestNotices,
    latestNotes,
  };
};

module.exports = {
  getDashboard,
};