const Task = require("../models/taskModel");

const addTask = (io, taskObj) => {
  let result;
  const newTask = new Task(taskObj);
  newTask.save((err, todo) => {
    if (err) {
      result = err;
    } else {
      const result = {
        message: "Todo Added Successfully",
        todo,
      };
      io.emit("add", result.todo._doc);
    }
  });
};

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    Task.find()
      .then((tasks) => {
        resolve(tasks);
      })
      .catch((err) => reject(err));
  });
};

const editTask = (_id, task) => {
  return new Promise((resolve, reject) => {
    Task.findOneAndUpdate({ _id }, task, {
      new: true,
    })
      .then((taskInfo) => resolve(taskInfo))
      .catch((err) => reject(err));
  });
};

const deleteTask = (task) => {
  return new Promise((resolve, reject) => {
    Task.findByIdAndDelete({ _id: task._id })
      .then((taskResponse) => resolve(taskResponse._doc))
      .catch((err) => reject(err));
  });
};

module.exports = {
  addTask,
  getAllTasks,
  editTask,
  deleteTask,
};
