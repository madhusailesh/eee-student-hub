const Note = require("../notes/notes.model");
const Pyq = require("../pyqs/pyq.model");
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
    Note.countDocuments({ isActive: true }),
    Pyq.countDocuments({ isActive: true }),
    Subject.countDocuments({ isActive: true }),
    Faculty.countDocuments({ isActive: true }),
    Notice.countDocuments({ isActive: true }),
    Timetable.countDocuments({ isActive: true }),

    Notice.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5),

    Note.find({ isActive: true })
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