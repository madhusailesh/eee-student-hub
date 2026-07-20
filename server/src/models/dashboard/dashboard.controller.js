const dashboardService = require("./dashboard.service");
const catchAsync = require("../../utils/asyncHandler");

const getDashboard = catchAsync(async (req, res) => {
  const dashboard = await dashboardService.getDashboard();

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});

module.exports = {
  getDashboard,
};