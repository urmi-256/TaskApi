const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// create a task
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task with the specified title and priority
 *     requestBody:
 *       description: Task object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: number
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *       400:
 *         description: Failed to create task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create task
 */
router.post("/tasks", (req, res) => {
  const { title, priority } = req.body;
  const task = new Task({ title, priority });
  task
    .save()
    .then(() => {
      res.json({ message: "Task created successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Failed to create task" });
    });
});

// list the tasks
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks sorted by priority
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of tasks sorted by priority
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: An array containing the task ID, title, priority, and status
 *       400:
 *         description: Failed to get tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      const sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
      const taskList = sortedTasks.map((task, index) => {
        return [task.id, task.title, task.priority, task.status];
      });
      res.json({ tasks: taskList });
    })
    .catch((err) => {
      res.status(400).json({ message: "Failed to get tasks" });
    });
});

// mark a task as completed
/**
 * @swagger
 * /tasks/{id}/complete:
 *   put:
 *     summary: Mark a task as completed
 *     description: Updates the status of a task to "completed"
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the task to mark as completed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.put("/tasks/:id/complete", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// mark a task as canceled
/**
 * @swagger
 * /tasks/{id}/cancel:
 *   put:
 *     summary: Mark a task as canceled
 *     description: Updates the status of a task to "canceled"
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the task to mark as canceled
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.put("/tasks/:id/cancel", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "canceled" },
      { new: true }
    );
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /tasks/{id}/del:
 *   put:
 *     summary: Mark a task as deleted
 *     description: Updates the status of a task to "deleted"
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the task to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.put("/tasks/:id/del", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "deleted" },
      { new: true }
    );
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
