const pool = require("../db");

class Controller {
  createDimension = async (req, res) => {
    try {
      let { width, height } = req.body;
      const newDimension = await pool.query(
        "INSERT INTO dimension (width,height) VALUES ($1,$2) RETURNING *",
        [width, height]
      );
      return res.status(200).json({
        message: "Dimensions created Successfully",
        success: true,
        data: newDimension.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getAllDimensions = async (req, res) => {
    try {
      const allDimensions = await pool.query("SELECT * FROM dimension");
      return res.status(200).json({
        message: "Dimensions retrieved Succesfully",
        success: true,
        data: allDimensions.rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getDimensionById = async (req, res) => {
    try {
      const { id } = req.params;
      const dimensionToBeRetrieved = await pool.query(
        "SELECT * FROM dimension where dimension_id = $1",
        [id]
      );
      if (!dimensionToBeRetrieved.rows[0]) {
        return res.status(404).json({
          message: "Dimension Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Dimension retrieved Succesfully",
        succes: true,
        data: dimensionToBeRetrieved.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  deleteDimensionById = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteDimension = await pool.query(
        "DELETE FROM dimension WHERE dimension_id = $1",
        [id]
      );
      if (deleteDimension.rowCount == 0) {
        return res.status(404).json({
          message: "Dimension Not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Dimension deleted Successfully",
        success: true,
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
