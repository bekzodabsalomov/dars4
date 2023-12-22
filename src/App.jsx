import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleComplete,
  statistic,
} from "./feauters/todoSlice";

function App() {
  const title = useRef();
  const completedCheck = useRef();
  const dispatch = useDispatch();
  const { todos, completed, uncompleted } = useSelector(
    (store) => store.todo
  );

  useEffect(() => {
    dispatch(statistic());
  }, [todos, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      title: title.current.value,
      completed: completedCheck.current.checked,
    };

    dispatch(addTodo(newTodo));
    title.current.value = "";
    completedCheck.current.checked = false;
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen">
      <form onSubmit={handleSubmit} className="text-white bg-teal-500 p-6 rounded">
        <h2 className="text-2xl font-bold mb-3">Add new todo</h2>
        <div className="mb-3">
          <label className="block mb-2">Title</label>
          <input
            required
            ref={title}
            type="text"
            className="input input-bordered input-secondary w-full text-indigo-800 font-bold"
          />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <label className="block mb-2">Completed</label>
            <input
              ref={completedCheck}
              type="checkbox"
              className="checkbox checkbox-success"
            />
          </div>
          <button className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Add
          </button>
        </div>
      </form>
      <div className="mt-6">
        <h1 className="text-white text-3xl font-bold mb-3">My todos with redux</h1>
        <ul className="flex flex-col gap-4 text-white">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col items-center gap-4 p-4 bg-gray-800 m-auto w-full rounded-lg shadow-md"
            >
              <div className="flex flex-col w-full">
                <h2 className="text-2xl font-bold">{todo.title}</h2>
                <p className="text-sm">
                  Completed:{" "}
                  <span
                    className={todo.completed ? "text-green-400" : "text-red-400"}
                  >
                    {todo.completed ? "true" : "false"}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 w-full justify-between">
                <button
                  onClick={() => dispatch(toggleComplete(todo.id))}
                  className={`bg-${todo.completed ? 'red' : 'green'}-400 text-white px-4 py-2 rounded hover:bg-${todo.completed ? 'red' : 'green'}-500`}
                >
                  {todo.completed ? "Uncomplete" : "Complete"}
                </button>
                <button
                  onClick={() => {
                    dispatch(removeTodo(todo.id));
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4 text-gray-300">
          <h2>Completed: {completed}</h2>
          <h2>Uncompleted: {uncompleted}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;