const Medication = require("../models/medicationModel");
const appError = require("../utils/appError");
const {
  createOne,
  updateOne,
  getOne,
  getAll,
  deleteOne,
} = require("./queriesHandler");

exports.addMedication = createOne(Medication);
exports.updateMedication = updateOne(Medication);
exports.getMedication = getOne(Medication);
exports.getAllMedications = getAll(Medication);
exports.deleteMedication = deleteOne(Medication);

exports.searchMedication = async (req, res, next) => {
  const docs = await Medication.find({ $text: { $search: req.query.query } });

  if (docs.length === 0) {
    return next(new appError("No medications found matching your search", 404));
  }

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: docs,
  });
};
