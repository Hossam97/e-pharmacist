const express = require("express");
const {
  addMedication,
  updateMedication,
  getMedication,
  deleteMedication,
  getAllMedications,
} = require("../controllers/medicationsController");
const router = express.Router();

router.route("/").get(getAllMedications).post(addMedication);

router
  .route("/:id")
  .get(getMedication)
  .patch(updateMedication)
  .delete(deleteMedication);

module.exports = router;
