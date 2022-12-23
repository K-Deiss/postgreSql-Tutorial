const pool = require("../db");

class Controller {
  createToDo = async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]
      );
      return res.status(200).json({
        message: "Created Successfully",
        success: true,
        data: newTodo.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${err}`,
        success: false,
      });
    }
  };
  getAllToDo = async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM book2d");
      return res.status(200).json({
        message: "Data retrieved Successfully",
        success: true,
        data: allTodos.rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${err}`,
        success: false,
      });
    }
  };
  getBackInformation = async (req, res) => {
    try {
      const backInfo = await pool.query("SELECT width, height FROM book2d");
      return res.status(200).json({
        message: "Back info retrieved Successfully",
        success: true,
        data: backInfo.rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${err}`,
        success: false,
      });
    }
  };
  getToDoById = async (req, res) => {
    try {
      const { id } = req.params;
      const { bookname } = req.body;
      const todoToBeRetrieved = await pool.query(
        "SELECT * FROM book2d WHERE book2did = $1",
        [id]
      );
      if (!todoToBeRetrieved.rows[0]) {
        return res.status(404).json({
          message: "Not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Data retrieved Successfully",
        success: true,
        data: todoToBeRetrieved.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${err}`,
        success: false,
      });
    }
  };

  updateToDoById = async (req, res) => {
    try {
      const { id } = req.params; //WHERE
      const { description } = req.body; //SET
      const updateToDo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
        [description, id]
      );
      if (!updateToDo.rows[0]) {
        return res.status(404).json({
          message: "Not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "todo Updated Successfully",
        success: true,
        data: updateToDo.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${err}`,
        success: false,
      });
    }
  };
  deleteToDoById = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteToDo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
      );
      if (deleteToDo.rowCount == 0) {
        return res.status(404).json({
          message: "Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Deleted Successfully",
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
