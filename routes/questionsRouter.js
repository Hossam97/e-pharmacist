const express = require("express");
const {
  getAllQuestions,
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setQuestionUserId,
} = require("../controllers/questionsController");
const router = express.Router();

router.route("/").get(getAllQuestions).post(addQuestion);

router
  .route("/:id")
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);


module.exports = router;