"use client";
import { useState } from "react";
import styles from "./todo.module.css";

export const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodoHandler = () => {
    setTodos([...todos, newTodo]);
  };

  const DeleteTodo = (index) => {
    // confirm("Are you sure");
    // setTodos(todos.splice(index + 1, 1));
    // console.log(index);

    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.todobackground}>
      <h1>To-Do list</h1>
      <div className={styles.inputSection}>
        <input
          type="text"
          placeholder="Add a new task"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodoHandler}>Add</button>
      </div>
      <div className={styles.filterSection}>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <div className={styles.todoSection}>
        {todos.map((todo, index) => {
          if (todos.length === 0) {
            return (
              <div>
                <p key={index}>Nothing to show</p>
              </div>
            );
          } else
            return (
              <div key={index} className={styles.todoContainer}>
                <div>
                  <input type="checkbox"></input>
                  <p>{todo}</p>
                </div>
                <button onClick={() => DeleteTodo(index)}>Delete</button>
              </div>
            );
        })}
      </div>
    </div>
  );
};
