"use client";
import { use, useState } from "react";
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
    if (newTodo.taskName.trim() === "") return;

    setTodos([...todos, newTodo]);
    setTodosTemp([...todos, newTodo]);
    setNewTodo({
      taskName: "",
      isCompleted: false,
    });
    console.log(newTodo);
  };

  const DeleteTodo = (index) => {
    confirm("Are you sure to delete this item?");
    const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(updatedTodos);
    setTodosTemp(updatedTodos);

    const completedCount = updatedTodos.filter(
      (todo) => todo.isCompleted
    ).length;
    setCheckedTasks(completedCount);
  };

  const CheckedTasks = (index) => {
    todos[index].isCompleted
      ? (todos[index].isCompleted = false)
      : (todos[index].isCompleted = true);
    setTodos([...todos]);

    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    setCheckedTasks(completedCount);
  };

  const FilterByAll = () => {
    setActiveButton("all");
    setTodosTemp([...todos]);
  };

  const FilterByActive = () => {
    setActiveButton("active");
    const filteredByActive = todos.filter((todo) => todo.isCompleted == false);

    setTodosTemp(filteredByActive);
  };

  const FilterByCompleted = () => {
    setActiveButton("completed");

    const filteredByCompleted = todos.filter(
      (todo) => todo.isCompleted == true
    );
    setTodosTemp(filteredByCompleted);
  };

  const clearCompletedTasks = () => {
    confirm("Are you sure to delete this item?");

    const remainingTodos = todos.filter((todo) => todo.isCompleted == false);
    setTodos(remainingTodos);
    setTodosTemp(remainingTodos);

    const completedCount = remainingTodos.filter(
      (todo) => todo.isCompleted
    ).length;
    setCheckedTasks(completedCount);
  };

  return (
    <div className={styles.todobackground}>
      <h1>To-Do list</h1>
      <div className={styles.inputSection}>
        <input
          type="text"
          value={newTodo.taskName}
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
        {todosTemp.length ? (
          todosTemp.map((todo, index) => {
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
                <button
                  className={styles.taskDeleteButton}
                  onClick={() => DeleteTodo(index)}
                >
                  Delete
                </button>
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
          <button onClick={clearCompletedTasks}>Clear completed</button>
        </div>
      ) : (
        <p></p>
      )}
      <div className={styles.poweredBy}>
        <p>Powered by</p>{" "}
        <a href="https://www.pinecone.mn/">Pinecone academy</a>
      </div>
    </div>
  );
};
