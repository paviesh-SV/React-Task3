import React from "react";
import { useState, useEffect } from "react";
import Task from "./components/Task";

// Function App which acts as the main body for all the components
function App() {
  // useState to able to modify the variables
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Not Completed");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [edit, setEdit] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  //useEffect used to store task data and retrive it data so that DOM can be directly updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(`Storing: ${tasks}`)
  }, [tasks])


  useEffect(() => {
    const storedTask = localStorage.getItem("tasks");
    if (storedTask) {
      setTasks(JSON.parse(storedTask))
    }
    console.log(`Retrieving from storage: ${storedTask}`);
  }, [])


  //function to add task to the card
  const addTask = () => {
    if (taskName.trim() === "" || taskDescription.trim() === "") {
      return;
    }

    if (edit) {
      const updatedTask = tasks.map((task) => {
        if (task.id === editTaskId) {
          return { ...task, taskName, taskDescription, status };
        }
        return task;
      })

      setTasks(updatedTask);
      setEdit(false);
      setEditTaskId(null);
    }
    else {
      const newTasks = {
        id: tasks.length + 1,
        taskName,
        taskDescription,
        status: "Not Completed"
      }
      setTasks([...tasks, newTasks]);
    }

    setTaskName("");
    setTaskDescription("");
    setStatus("Not Completed");
  }


  //function to delete tasks
  const deleteTask = (id) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  }


  //function to update the status of the tasks
  const updateStatus = (id, newStatus) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: newStatus }
      }
      return task;
    })
    setTasks(updatedTask);
  }


  // function to edit the name, description and status of the tasks
  const editTask = (id) => {
    const TaskEdited = tasks.find((task) => task.id === id);
    if (TaskEdited) {
      setTaskName(TaskEdited.taskName);
      setTaskDescription(TaskEdited.taskDescription);
      setStatus(TaskEdited.status);
      setEdit(true);
      setEditTaskId(id);
    }
  }

  //function to filter the task cards from completed, not completed and both
  const filterTask = () => {
    switch (filter) {
      case "Completed":
        return tasks.filter((task) => task.status === "Completed");
      case "Not Completed":
        return tasks.filter((task) => task.status === "Not Completed");
      default:
        return tasks;
    }
  }


  return (
    <>
      <div className="container mt-md-5">
        <h1 className="text-center mt-2 text-success" id="Title">Task List</h1>

        {/* Creating a form with input field form for task name and description */}
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="my-4 mx-4 rounded-4 border-dark form-control"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              required
            />

            <input
              type="text"
              className="my-4 mx-4 rounded-4 border-dark form-control"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description"
              required
            />

          {/* Submit button which creates a card on submit and changes to update, when we want to edit the task */}
            <button
              className="btn text-white bg-success p-3 btn-primary border-primary px-5 my-4 rounded-pill"
              onClick={addTask}
            >
              {edit ? "Update Task" : "Add Task"}
            </button>

          </div>
        </form>

        {/* Filter option which will allow us to filter the cards betwee task completed, not completed and all */}
        <div className="input-group text-success">
          <h4>My Task List:</h4>

          <div className="ms-auto">
            <label htmlFor="filter">
              <h4>Status Filter: </h4>
            </label>
            <select
              className="mx-2 text-white, rounded-2 bg-yellow"
              value={filter}
              name="filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option
                value="All"
                className="text-white bg-secondary"
              >
                All
              </option>

              <option
                value="Completed"
                className="text-white bg-info"
              >
                Completed
              </option>

              <option
                value="Not Completed"
                className="text-white bg-danger"
              >
                Not Completed
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* sending the task data to the Task.jsx file */}
      <div className="container mt-4 d-grid">
        <div className="row row-cols-1 row-cols-md-2 g-4 row-cols-lg-3">
          {filterTask().map((task) => (
            <div className="col" key={task.id}>
              <Task
                task={task}
                updateStatus={updateStatus}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
