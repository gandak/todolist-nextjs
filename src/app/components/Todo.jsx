"use client";
import { useState } from "react";
import styles from "./todo.module.css";

export const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [todosTemp, setTodosTemp] = useState([...todos]);
  const [newTodo, setNewTodo] = useState([
    {
      taskName: "",
      isCompleted: false,
    },
  ]);
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

  const CheckedTasks = (index) => {
    todos[index].isCompleted
      ? (todos[index].isCompleted = false)
      : (todos[index].isCompleted = true);
    setTodos([...todos]);
    // console.log(todos[index]);
  };

  const FilterByAll = () => {
    setActiveButton("all");
    setTodos([...todosTemp]);
  };

  const FilterByActive = () => {
    setActiveButton("active");
    const filteredByActive = todos.filter((todo) => todo.isCompleted == false);

    setTodos([...filteredByActive]);
  };

  // console.log(todos);
  const FilterByCompleted = () => {
    setActiveButton("completed");

    // setTodos([...todosTemp]);
    const filteredByCompleted = todos.filter(
      (todo) => todo.isCompleted == true
    );
    setTodos([...filteredByCompleted]);
  };

  return (
    <div className={styles.todobackground}>
      <h1>To-Do list</h1>
      <div className={styles.inputSection}>
        <input
          type="text"
          placeholder="Add a new task"
          onChange={(e) =>
            setNewTodo({ taskName: `${e.target.value}`, isCompleted: false })
          }
        />
        <button onClick={addTodoHandler}>Add</button>
      </div>
      <div className={styles.filterSection}>
        <button
          className={activeButton == "all" && styles.activeButton}
          onClick={FilterByAll}
        >
          All
        </button>
        <button
          className={activeButton == "active" && styles.activeButton}
          onClick={FilterByActive}
        >
          Active
        </button>
        <button
          className={activeButton == "completed" && styles.activeButton}
          onClick={FilterByCompleted}
        >
          Completed
        </button>
      </div>
      <div className={styles.todoSection}>
        {todos.length ? (
          todos.map((todo, index) => {
            return (
              <div key={index} className={styles.todoContainer}>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => CheckedTasks(index)}
                    checked={todo.isCompleted}
                  ></input>
                  <p>{todo.taskName}</p>
                </div>
                <button onClick={() => DeleteTodo(index)}>Delete</button>
              </div>
            );
          })
        ) : (
          <p className={styles.noTaskDesc}>No tasks yet. Add one above!</p>
        )}
      </div>
      {todos.length > 0 ? (
        <div className={styles.footer}>
          <p>
            {checkedTasks} of {todos.length} tasks completed
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
