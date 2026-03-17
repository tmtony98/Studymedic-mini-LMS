const Example = require("../models/Example");

const getExamples = async (req, res, next) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    next(error);
  }
};

const createExample = async (req, res, next) => {
  try {
    const example = await Example.create(req.body);
    res.status(201).json(example);
  } catch (error) {
    next(error);
  }
};

module.exports = { getExamples, createExample };
