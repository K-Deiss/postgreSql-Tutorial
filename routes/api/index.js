const router = require("express").Router();

router.use("/todo-test", require("./book2dRoute"));
router.use("/dimension", require("./DimensionRoute"));
router.use("/pdfsize", require("./pdfSizeRoutes"));
router.use("/template", require("./templateRoute"));
module.exports = router;
