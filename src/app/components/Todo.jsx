"use client";
import { useState } from "react";
import styles from "./todo.module.css";

export const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeButton, setActiveButton] = useState("all");
  const [checkedTasks, setCheckedTasks] = useState(0);

  const addTodoHandler = () => {
    setTodos([...todos, newTodo]);
  };

  const DeleteTodo = (index) => {
    confirm("Are you sure to delete this item?");
    // setTodos(todos.splice(index + 1, 1));
    // console.log(index);

    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  // const completedTask2

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
        <button
          className={activeButton == "all" && styles.activeButton}
          onClick={() => setActiveButton("all")}
        >
          All
        </button>
        <button
          className={activeButton == "active" && styles.activeButton}
          onClick={() => setActiveButton("active")}
        >
          Active
        </button>
        <button
          className={activeButton == "completed" && styles.activeButton}
          onClick={() => setActiveButton("completed")}
        >
          Completed
        </button>
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
                  <input type="checkbox" onClick={completedTask()}></input>
                  <p>{todo}</p>
                </div>
                <button onClick={() => DeleteTodo(index)}>Delete</button>
              </div>
            );
        })}
      </div>
      <div className={styles.footer}>
        <p>1 of {todos.length} tasks completed</p>
      </div>
    </div>
  );
};
