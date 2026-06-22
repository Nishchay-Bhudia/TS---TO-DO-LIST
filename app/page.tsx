// npm run dev
// note - save before running ... 

"use client"; 

import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean
};

export default function Home() {

  const [todos, setTodos] = useState<Todo[] >([]);
  const [inputVal, setInputVal] = useState<string>("");

  function handleAddTask() {
    if (inputVal.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputVal,
      completed: false
    };

    setTodos([...todos, newTodo]);

    setInputVal("");
  }

  function handleToggleTodo(idToToggle: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === idToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function handleDeleteTodo(idToDelete: number) {
  const remainingTodos = todos.filter(todo => todo.id !== idToDelete);
  setTodos(remainingTodos);
  }


  //ui
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-6">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
        
        <h1 className="text-2xl font-bold mb-6 text-center">To Do List</h1>
        
        {/* Input Bar */}
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 p-2 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleAddTask} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {todos.length === 0 && (
            <p className="text-slate-400 text-center text-sm">No tasks yet. Add one above</p>
          )}
          
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-700">
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => handleToggleTodo(todo.id)} 
                className="h-4 w-4 rounded accent-blue-500 cursor-pointer" 
              />
              <span className={todo.completed ? "line-through text-slate-400" : "text-slate-100"}>
                {todo.text}
              </span>
              <button className="text-red-500 hover:text-red-400 text-sm ml-auto">
                
                Delete
                
              </button>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}

