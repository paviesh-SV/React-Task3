import React from "react";

const Task = ({ task, updateStatus, editTask, deleteTask }) => {
    return (
        <>
            {/* Creating the card to output our task list */}
            <div className="container justify-content-center align-items-center d-flex">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div key={task.id} className="col">
                        <div
                            className="card h-100 rounded-4 border-4"
                            style={{
                                width: "20rem",
                                background: "radial-gradient(white,lightgreen)"
                            }}
                        >
                            {/* card body with the task name */}
                            <div className="card-body m-2">
                                <p className="card-text text-black fw-bold">
                                    <span id="name">Name: </span>
                                    {task.taskName}{" "}
                                </p>

                                {/* Task description */}
                                <p className="fw-bold">
                                    <span id="description">Description: </span>
                                    {task.taskDescription}
                                </p>

                                {/* Task status and updation of task status */}
                                <div className="mb-2">
                                    {" "}
                                    <label htmlFor="status" className="me-1">
                                        <b id="status">Status: </b>
                                    </label>

                                    <select
                                        className={
                                            task.status === "Completed" ? "bg-info text-dark" : "bg-danger text-white"
                                        }
                                        style={{
                                            borderRadius: "4px",
                                            border: "none"
                                        }}
                                        value={task.status}
                                        name="status"
                                        onChange={(e) => updateStatus(task.id, e.target.value)}
                                    >
                                        <option
                                            value="Completed"
                                            className={
                                                task.status === "Completed" ? "bg-info text-dark" : ""
                                            }
                                        >
                                            Completed
                                        </option>

                                        <option
                                            value="Not Completed"
                                            className={
                                                task.status !== "Completed" ? "bg-danger text-white" : ""
                                            }
                                        >
                                            Not Completed
                                        </option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* button on the card to edit task and delete task */}
                            {/* Edit the task name and description on thw card */}
                            <div className="float-end m-3 p-2">
                                <button
                                    className="btn btn-primary mx-2"
                                    type="button"
                                    onClick={() => editTask(task.id)}
                                >
                                    Edit
                                </button>
                                
                                {/* Delete task card */}
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Task;