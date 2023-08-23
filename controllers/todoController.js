const Todo = require("../models/Todo");

// get all todos
module.exports.todos_get = async (req, res) => {
  let userId = res.locals.user._id + "";
  // get data from mongodb
  try {
    const data = await Todo.find({ userId: userId }).sort("createdAt");
    res.render("todos", { todos: data });
    // res.render("todos").status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
// take a todo and send to database // create a todo
module.exports.todos_post = async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
};
// delete a todo
module.exports.todos_delete = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      task: req.body.task,
      userId: req.body.userId,
    });

    if (todo) {
      await Todo.deleteOne({ task: req.body.task, userId: req.body.userId });
      res.status(200).json("Your task has been deleted");
    } else {
      res.status(403).json("This task does not exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
