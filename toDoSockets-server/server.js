require("dotenv").config();
const express = require("express"),
  http = require("http"),
  app = express(),
  httpServer = http.createServer(app),
  { Server } = require("socket.io"),
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:4200",
    },
  }),
  taskController = require("./controllers/taskController"),
  cors = require("cors"),
  mongoose = require("mongoose", (port = process.env.PORT || 4000), (dbHost =
    process.env.DBHOST || "mongodb://0.0.0.0:27017"));

//middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", () => {
  taskController
    .getAllTasks()
    .then((tasks) => {
      io.emit("getAllTasks", tasks);
    })
    .catch((err) => console.log(err));
});

// Socket connection
io.on("connection", (socket) => {
  console.log(`Someone with id : ${socket.id} connected`);
  socket.on("addTask", (task) => {
    console.log(`Task : ${JSON.stringify(task)}`);
    taskController.addTask(io, task);
  });

  socket.on("editTask", (task) => {
    console.log(`Edited Task ${JSON.stringify(task)}`);
    taskController
      .editTask(task._id, task)
      .then((task) => {
        io.emit("edit", task);
      })
      .catch((err) => console.log(err));
  });

  socket.on("deleteTask", (task) => {
    console.log(`Deleted task : ${JSON.stringify(task)}`);
    taskController
      .deleteTask(task)
      .then((deletedTask) => io.emit("delete", deletedTask))
      .catch((err) => console.log(err));
  });

  socket.on("disconnect", () => {
    console.log("Someone disconnected");
  });
});

// Connect into DB
mongoose
  .connect(`${dbHost}/toDoApp`)
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
