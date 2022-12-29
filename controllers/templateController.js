const pool = require("../db");

class Controller {
  createTemplate = async (req, res) => {
    try {
      const { templatename } = req.body;
      const { templatesizeid } = req.body;
      const { book2did } = req.body;
      const newTemplate = await pool.query(
        "INSERT INTO ( templatename, templatesizeid, book2did) VALUES($1,$2,$3) RETURNING *",
        [templatename, templatesizeid, book2did]
      );
      return res.status(200).json({
        message: "Template created Successfully",
        success: true,
        data: newTemplate.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getAllTemplates = async (req, res) => {
    try {
      const allTemplate = await pool.query("SELECT * FROM template ");
      return res.status(200).json({
        message: "Data retrieved Successully",
        success: true,
        data: allTemplate.rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getTemplateInfoById = async (req, res) => {
    try {
      const { templateId } = req.body;
      const { book2dId } = req.body;
      const allTemplateInfo = await pool.query(
        "SELECT DISTINCT * FROM template  JOIN templatesize ON template.templatesizeid= templatesize.templatesizeid JOIN book2d ON template.book2did =  book2d.book2did WHERE template.templatesizeid = $1 AND template.book2did = $2",
        [templateId, book2dId]
      );
      if (allTemplateInfo.rowCount == 0) {
        return res.status(404).json({
          message: "Not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Data retrieved Successfully",
        success: true,
        data: allTemplateInfo.rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  deleteTemplateById = async (req, res) => {
    try {
      const { id } = req.body;
      const deleteTemplate = await pool.query(
        "DELETE FROM template WHERE templateid = $1",
        [id]
      );
      if (deleteTemplate.rowCount == 0) {
        return res.status(404).json({
          message: "Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Template Deleted Successfully",
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
