const Medication = require("../models/medicationModel");
const { createOne, updateOne, getOne, getAll, deleteOne } = require("./queriesHandler");

exports.addMedication = createOne(Medication);
exports.updateMedication = updateOne(Medication);
exports.getMedication = getOne(Medication);
exports.getAllMedications = getAll(Medication);
exports.deleteMedication = deleteOne(Medication);
