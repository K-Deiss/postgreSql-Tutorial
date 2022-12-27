const router = require("express").Router();
const controller = require("../../controllers/dimensionController");

router.post("/create-dimension", controller.createDimension);
router.get("/get-all-dimensions", controller.getAllDimensions);
router.get("/get-dimension/:id", controller.getDimensionById);
router.delete("/delete-dimension/:id", controller.deleteDimensionById);
module.exports = router;
