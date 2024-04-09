const appError = require("../utils/appError");

exports.createOne = (Model) => async (req, res, next) => {
  const doc = await Model.create(req.body);
  res.status(201).json({
    status: "success",
    // message: ``
    newDoc: doc,
  });
};

exports.updateOne = (Model) => async (req, res, next) => {
  console.log(req.params.id);
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new appError("No medication found with the provided ID", 404));
  }

  res.status(200).json({
    status: "success",
    newDoc: doc,
  });
};

exports.getOne = (Model) => async (req, res, next) => {
  const doc = await Model.findById(req.params.id);
  if (!doc) {
    return next(new appError("No medication found with the provided ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

exports.getAll = (Model) => async (req, res, next) => {
  const docs = await Model.find();
  if (!docs) {
    return next(new appError("No medication found with the provided ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: docs,
  });
};

exports.deleteOne = (Model) => async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new appError("No medication found with the provided ID", 404));
    };
  
    res.status(200).json({
      status: "success",
      message: "Medication deleted successfully"
    });
  };