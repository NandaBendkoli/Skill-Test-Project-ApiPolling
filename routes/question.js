const express= require("express");
const router = express.Router();
const app = express();
const questionController= require("../controllers/question_controller");


router.post("/create", questionController.create);
router.get("/:id/delete", questionController.deleteQuestion);
router.post("/:id/options/create", questionController.addOptions);
router.get("/:id", questionController.showAllQuestions);

module.exports = router;