const appError = require("../utils/appError");

exports.createOne = (Model) => async (req, res, next) => {
  const doc = await Model.create(req.body);
  const modelName = Model.collection.collectionName;
  res.status(201).json({
    status: "success",
    message: `${modelName.slice(0,-1)} has been created successfully`,
    newDoc: doc,
  });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const modelName = Model.collection.collectionName;
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new appError(`No ${modelName} found with the provided ID`, 404));
  }

  res.status(200).json({
    status: "success",
    message: `${modelName.slice(0, -1)} updated successfully`,
    newDoc: doc,
  });
};

exports.getOne = (Model) => async (req, res, next) => {
  const modelName = Model.collection.collectionName;
  const doc = await Model.findById(req.params.id);
  if (!doc) {
    return next(new appError(`No ${modelName} found with the provided ID`, 404));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

exports.getAll = (Model) => async (req, res, next) => {
  const docs = await Model.find();
  const modelName = Model.collection.collectionName;

  if (docs.length === 0) {
    res.status(200).json({
      status: "success",
      message: `No ${modelName} available` 
    });
  }

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: docs,
  });
};

exports.deleteOne = (Model) => async (req, res, next) => {
  const modelName = Model.collection.collectionName;
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new appError(`No ${modelName} found with the provided ID`, 404));
    };
  
    res.status(200).json({
      status: "success",
      message: `${modelName.slice(0, -1)} deleted successfully`
    });
  };