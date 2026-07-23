const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("./resource.service");

const create = async (req, res, next) => {
  try {
   const fileUrl = `${req.protocol}://${req.get("host")}/uploads/resources/${req.file.filename}`;

const resource = await createResource({
  ...req.body,
  fileUrl,
  uploadedBy: req.user._id,
});

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resources = await getAllResources(req.query);

    res.json({
      success: true,
      data: resources,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const resource = await getResourceById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.fileUrl =
  `${req.protocol}://${req.get("host")}/uploads/resources/${req.file.filename}`;
    }

    const resource = await updateResource(req.params.id, payload);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const resource = await deleteResource(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};