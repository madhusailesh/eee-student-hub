const Subject = require("./subject.model");

const createSubject = async (data) => {
  return await Subject.create(data);
};

const getAllSubjects = async (filters) => {
  const { semester, branch } = filters;

  const query = {
    isActive: true,
  };

  if (semester) query.semester = Number(semester);
  if (branch) query.branch = branch.toUpperCase();

  return await Subject.find(query)
    .sort({
      semester: 1,
      code: 1,
    });
};

const getSubjectById = async (id) => {
  return await Subject.findById(id);
};
const getSubjectByCode = async (code) => {
  console.log("Searching code:", code);

  const subject = await Subject.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  console.log("Found subject:", subject);

  return subject;
};
module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectByCode,
};