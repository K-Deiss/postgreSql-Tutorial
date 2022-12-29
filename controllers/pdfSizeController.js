const pool = require("../db");

class Controller {
  createPdfSize = async (req, res) => {
    try {
      const { firstId, secondId } = req.body;
      const newPdfSize = await pool.query(
        "INSERT INTO pdfsize (pagedimension,diecutdimension) VALUES ($1,$2) RETURNING *",
        [firstId, secondId]
      );
      return res.status(200).json({
        message: "PdfSize created Successfully",
        success: true,
        data: newPdfSize.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getPdfSizeWithDimensions = async (req, res) => {
    try {
      const { id } = req.body;
      const pdfSize = await pool.query(
        "SELECT pdfsize.pdfsize_id, dimension.width, dimension.height FROM pdfsize JOIN dimension ON pdfsize.pdfsize_id= dimension.dimension_id AND pdfsize.pdfsize_id = $1",
        [id]
      );
      if (pdfSize.rowCount == 0) {
        return res.status(404).json({
          message: "Pdf Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Pdf Retrieved Successfully",
        success: true,
        data: pdfSize.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
}
const controller = new Controller();
module.exports = controller;
