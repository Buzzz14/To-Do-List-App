import React, { useState, useEffect } from "react";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let tString = localStorage.getItem("tasks");
    if (tString) {
      let t = JSON.parse(localStorage.getItem("tasks"));
      setTasks(t);
    }
  }, []);

  const saveToLS = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  function toggleComplete(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveToLS(updatedTasks);
  }

  function handleInput(event) {
    setNewTask(event.target.value);
  }

  function addJob() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => {
        const updatedTasks = [
          ...prevTasks,
          { task: newTask, completed: false },
        ];
        saveToLS(updatedTasks);
        return updatedTasks;
      });
      setNewTask("");
    }
  }

  function deleteJob(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveToLS(updatedTasks);
  }

  function moveUp(index) {
    if (index > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
          updatedTasks[index - 1],
          updatedTasks[index],
        ];
        saveToLS(updatedTasks);
        return updatedTasks;
      });
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
          updatedTasks[index + 1],
          updatedTasks[index],
        ];
        saveToLS(updatedTasks);
        return updatedTasks;
      });
    }
  }

  return (
    <>
      <header>
        <h1 className="text-2xl text-center mb-16 bg-gray-800 font-medium text-white p-4">
          To-Do List
        </h1>
      </header>

      <main className="p-10">
        <div className="grid sm:grid-cols-[2fr_1fr] mb-10 max-w-xl mx-auto">
          <input
            className="flex-grow border border-gray-300 p-3 outline-none"
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInput}
          />

          <button
            className="bg-gray-800 text-white p-2 hover:bg-gray-600"
            onClick={addJob}
          >
            Add Task
          </button>
        </div>

        <ol className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between max-w-2xl mx-auto flex-col sm:flex-row items-start p-2 border border-gray-300 rounded"
            >
              <div className="flex items-center flex-1 mr-4 mb-3">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span
                  className={`text-clip break-all ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.task}
                </span>
              </div>

              <div className="flex gap-2 m-auto">
                <button
                  className="bg-gray-800 text-white hover:bg-gray-600 p-3  rounded"
                  onClick={() => deleteJob(index)}
                >
                  Delete
                </button>

                <button
                  className="text-gray-800 hover:text-gray-500"
                  onClick={() => moveUp(index)}
                >
                  <i className="fa-solid fa-angle-up"></i>
                </button>

                <button
                  className="text-gray-800 hover:text-gray-500"
                  onClick={() => moveDown(index)}
                >
                  <i className="fa-solid fa-angle-down"></i>
                </button>
              </div>
            </li>
          ))}
        </ol>
      </main>

      <footer>
        <p className="text-center">&copy; 2024 To-Do List App</p>
      </footer>
    </>
  );
}

export default App;
