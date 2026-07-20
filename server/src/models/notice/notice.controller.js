const noticeService = require("./notice.service");
const catchAsync = require("../../utils/asyncHandler");
const createNotice = catchAsync(async (req, res) => {
  const notice = await noticeService.createNotice(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Notice created successfully",
    data: notice,
  });
});

const getAllNotices = catchAsync(async (req, res) => {
  const notices = await noticeService.getAllNotices();

  res.status(200).json({
    success: true,
    count: notices.length,
    data: notices,
  });
});

const getNoticeById = catchAsync(async (req, res) => {
  const notice = await noticeService.getNoticeById(req.params.id);

  res.status(200).json({
    success: true,
    data: notice,
  });
});

const updateNotice = catchAsync(async (req, res) => {
  const notice = await noticeService.updateNotice(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Notice updated successfully",
    data: notice,
  });
});

const deleteNotice = catchAsync(async (req, res) => {
  const result = await noticeService.deleteNotice(req.params.id);

  res.status(200).json({
    success: true,
    ...result,
  });
});

module.exports = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};