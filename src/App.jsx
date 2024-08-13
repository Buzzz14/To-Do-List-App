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
  }

  function toggleComplete(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed
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
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, { task: newTask, completed: false }];
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
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
        saveToLS(updatedTasks);
        return updatedTasks;
      });
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        saveToLS(updatedTasks);
        return updatedTasks;
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-5 m-5 shadow-xl border">
      <h1 className="font-bold text-4xl mb-16 bg-blue-500 text-white p-5">To-Do List</h1>

      <div className="mb-8 grid sm:grid-cols-[2fr_1fr] ">
        <input className="flex-grow border border-gray-300 p-2 outline-none" type="text" 
        placeholder="Enter a task..." value={newTask} onChange={handleInput}/>

        <button className="bg-blue-500 text-white p-2 hover:bg-blue-400" onClick={addJob}>Add Task</button>
      </div>

      <ol className="space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between flex-col sm:flex-row items-start p-2 border border-gray-300 rounded">
            <div className="flex items-center flex-1 mr-4 mb-3">
              <input className="mr-2" type="checkbox" checked={task.completed} onChange={() => toggleComplete(index)}/>
              <span className={`text-clip break-all ${task.completed ? "line-through" : ""}`}>{task.task}</span>
            </div>

            <div className="flex gap-2 m-auto">
              <button className="bg-red-500 text-white hover:bg-red-400 p-3  rounded" onClick={() => deleteJob(index)}>
                Delete
              </button>

              <button className="text-blue-500 hover:text-blue-300" onClick={() => moveUp(index)}>
                <i className="fa-solid fa-angle-up"></i>
              </button>

              <button className="text-blue-500 hover:text-blue-300" onClick={() => moveDown(index)}>
                <i className="fa-solid fa-angle-down"></i>
              </button>
            </div>
          </li>
        ))}
      </ol>

    </div>
  )
}

export default App