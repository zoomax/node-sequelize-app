const { Op } = require("sequelize");
const { Tutorial } = require("../db/db.connection");
const tutorialModel = require("../db/models/tutorial.model");

const createTutorial = async (req, res) => {
  const {
    body: { title, description, published },
  } = req;
  if (!title) {
    return res.status(400).json({
      error: "this field is required",
    });
  }
  try {
    const tutorial = await Tutorial.create({
      title,
      description,
      published,
    });
    console.log(tutorial);
    return res.status(201).json({ data: tutorial });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const retrieveTutorials = async (req, res) => {
  let { title } = req.query;
  console.log(Object.keys(req).indexOf("query"));
  try {
    const conditions = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const tutorials = await Tutorial.findAll({ where: conditions });
    console.log(tutorials);
    return res.status(200).json({ data: tutorials, queryparams: req.query });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTutorialById = async (req, res) => {
  let { id } = req.params;
  try {
    const tutorial = await Tutorial.findByPk(id);
    console.log(tutorial);
    if (!tutorial)
      return res.status(404).json({ message: "data were not found", data: [] });
    return res.status(200).json({ data: tutorial });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateTutorialById = async ({ body, params, query }, res) => {
  let { id } = params;
  let { title, description, published } = body;
  try {
    const tutorial = await Tutorial.update(
      { title, description, published },
      {
        where: { id },
      }
    ); // returns 0 if not exist & 1 id data exists
    if (tutorial == 0)
      return res.status(404).json({ message: "data were not found", data: [] });
    return res.status(203).json({
      data: tutorial,
      statusCode: 203,
      status: "UPDATED",
      message: "data were updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteTutorialById = async (req, res) => {
  let { id } = req.params;
  try {
    const tutorial = await Tutorial.destroy({ where: { id } }); // returns 0 if not exist & 1 id data exists
    console.log(tutorial);
    if (tutorial == 0)
      return res.status(404).json({ message: "data were not found", data: [] });
    return res.status(202).json({
      message: "data were removed successfully",
      status: "DELETED",
      statusCode: 202,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getFirstMatchTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findOne({ where: req.query });
    console.log(tutorial);
    return res.status(200).json({
      data: tutorial,
      message: "data were retrieved successfully",
      status: "OK",
      statusCode: 200,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createTutorial,
  retrieveTutorials,
  getTutorialById,
  updateTutorialById,
  deleteTutorialById,
  getFirstMatchTutorial,
};
