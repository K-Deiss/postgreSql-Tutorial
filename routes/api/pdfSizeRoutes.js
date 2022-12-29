const router = require("express").Router();
const controller = require("../../controllers/pdfSizeController");

router.post("/create-pdfsize", controller.createPdfSize);
router.get("/get-pdf-with-dimensions", controller.getPdfSizeWithDimensions);
module.exports = router;
