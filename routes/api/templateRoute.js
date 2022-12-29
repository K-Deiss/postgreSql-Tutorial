const router = require("express").Router();
const controller = require("../../controllers/templateController");

router.post("/create-template", controller.createTemplate);
router.get("/get-template-by-id", controller.getTemplateInfoById);
router.get("/get-all-templates", controller.getAllTemplates);
router.delete("/delete-template", controller.deleteTemplateById);

module.exports = router;
