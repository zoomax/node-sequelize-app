const express = require("express");
const {
  createTutorial,
  retrieveTutorials,
  deleteTutorialById,
  getTutorialById,
  getFirstMatchTutorial,
  updateTutorialById,
} = require("../controllers/tutorial.controller");
const router = express.Router();
router;

router.post("/", createTutorial).get("/", retrieveTutorials);
router.get("/one", getFirstMatchTutorial);
router
  .get("/:id", getTutorialById)
  .put("/:id", updateTutorialById)
  .delete("/:id", deleteTutorialById);

module.exports = router;
