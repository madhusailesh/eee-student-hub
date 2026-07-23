const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("./resource.service");

const { uploadToR2, deleteFromR2 } = require("../../utils/uploadToR2");

// Create Resource
const create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const uploadedFile = await uploadToR2(req.file, "resources");

    const resource = await createResource({
      ...req.body,
      fileUrl: uploadedFile.url,
      fileKey: uploadedFile.key,
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

// Get All Resources
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

// Get Single Resource
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

// Update Resource
const update = async (req, res, next) => {
  try {
    const resource = await getResourceById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    const payload = { ...req.body };

    if (req.file) {
      // Delete old file from R2
      if (resource.fileKey) {
        await deleteFromR2(resource.fileKey);
      }

      // Upload new file
      const uploadedFile = await uploadToR2(req.file, "resources");

      payload.fileUrl = uploadedFile.url;
      payload.fileKey = uploadedFile.key;
    }

    const updatedResource = await updateResource(req.params.id, payload);

    res.json({
      success: true,
      data: updatedResource,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Resource
const remove = async (req, res, next) => {
  try {
    const resource = await getResourceById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Delete file from R2
    if (resource.fileKey) {
      await deleteFromR2(resource.fileKey);
    }

    // Delete document from MongoDB
    await deleteResource(req.params.id);

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