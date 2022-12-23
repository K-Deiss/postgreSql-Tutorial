const router = require("express").Router();
const controller = require("../../controllers/book2dController");

router.post("/create-todo", controller.createToDo);
router.get("/get-all", controller.getAllToDo);
router.get("/get-by-id/:id", controller.getToDoById);
router.get("/get-back-info", controller.getBackInformation);
router.put("/update-by-id/:id", controller.updateToDoById);
router.delete("/delete-by-id/:id", controller.deleteToDoById);

module.exports = router;
