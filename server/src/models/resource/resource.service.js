const Resource = require("./resource.model");
const Subject = require("../subjects/subject.model");

const createResource = async (data) => {
  return await Resource.create(data);
};

const getAllResources = async (filters) => {
  const query = {};

  if (filters.semester) {
    query.semester = Number(filters.semester);
  }

  if (filters.type) {
    query.type = filters.type;
  }

 if (filters.subjectCode) {
  console.log("Requested Code:", filters.subjectCode);

  const subject = await Subject.findOne({
    code: filters.subjectCode.toUpperCase(),
  });

  console.log("Subject Found:", subject);

  if (!subject) return [];

  console.log("Subject ID:", subject._id.toString());

  query.subject = subject._id;
}

console.log("Mongo Query:", query);

const resources = await Resource.find(query)
  .populate("subject", "name code semester")
  .populate("uploadedBy", "fullName email")
  .sort({ createdAt: 1 });
 console.log("Resources:", JSON.stringify(resources, null, 2)); 
 console.log("Database Name:", Resource.db.name);
 const all = await Resource.find();

console.log("Total Resources:", all.length);

const exp6 = all.find(r => r.title === "EXPERIMENT 6");

console.log("EXPERIMENT 6:", exp6);
return resources;
};
const getResourceById = async (id) => {
  return await Resource.findById(id)
    .populate("subject", "name code semester")
    .populate("uploadedBy", "fullName email");
};

const updateResource = async (id, data) => {
  return await Resource.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteResource = async (id) => {
  return await Resource.findByIdAndDelete(id);
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};