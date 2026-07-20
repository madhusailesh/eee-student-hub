const Notice = require("./notice.model");
const ApiError = require("../../utils/ApiError");

const createNotice = async (data, userId) => {
  return await Notice.create({
    ...data,
    uploadedBy: userId,
  });
};

const getAllNotices = async () => {
  return await Notice.find({ isActive: true })
    .populate("uploadedBy", "fullName email")
    .sort({
      priority: -1,
      createdAt: -1,
    });
};

const getNoticeById = async (id) => {
  const notice = await Notice.findById(id)
    .populate("uploadedBy", "fullName email");

  if (!notice || !notice.isActive) {
    throw new ApiError(404, "Notice not found");
  }

  return notice;
};

const updateNotice = async (id, data) => {
  const notice = await Notice.findById(id);

  if (!notice || !notice.isActive) {
    throw new ApiError(404, "Notice not found");
  }

  Object.assign(notice, data);

  await notice.save();

  return notice;
};

const deleteNotice = async (id) => {
  const notice = await Notice.findById(id);

  if (!notice || !notice.isActive) {
    throw new ApiError(404, "Notice not found");
  }

  notice.isActive = false;

  await notice.save();

  return {
    message: "Notice deleted successfully",
  };
};

module.exports = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};