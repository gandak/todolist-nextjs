"use client";
import { use, useState } from "react";
import styles from "./todo.module.css";

export const ToDo = () => {
  const buttons = ["All", "Active", "Completed"];
  const [todos, setTodos] = useState([]);
  const [todosTemp, setTodosTemp] = useState([...todos]);
  const [newTodo, setNewTodo] = useState({
    id: 1,
    taskName: "",
    isCompleted: false,
  });
  const [activeButton, setActiveButton] = useState("all");
  const [checkedTasks, setCheckedTasks] = useState(0);

  const addTodoHandler = () => {
    if (newTodo.taskName.trim() === "") {
      alert("Та утга оруулаагүй байна. Утга оруулна уу.");
      return;
    }
    if (todos.length > 0) {
      const lastToDoId = todos[todos.length - 1].id;

      newTodo.id = lastToDoId + 1;

      setTodos([...todos, newTodo]);
      setTodosTemp([...todos, newTodo]);
    } else {
      newTodo.id = 0;

      setTodos([...todos, newTodo]);
      setTodosTemp([...todos, newTodo]);
    }

    setNewTodo({
      id: 0,
      taskName: "",
      isCompleted: false,
    });

    console.log(newTodo);
  };

  const deleteTodo1 = (id) => {
    const confirmClear = window.confirm("Та устгахдаа итгэлтэй байна уу?");
    if (!confirmClear) return;

    // const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    todos.splice(id, 1);

    setTodos([...todos]);
    setTodosTemp([...todos]);

    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    setCheckedTasks(completedCount);
  };

  const checkedTasks1 = (id) => {
    todos[id].isCompleted
      ? (todos[id].isCompleted = false)
      : (todos[id].isCompleted = true);
    setTodos([...todos]);

    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    setCheckedTasks(completedCount);
  };

  const filterTasks = (button) => {
    if (button === "all") {
      setActiveButton("all");
      setTodosTemp([...todos]);
    }

    if (button === "active") {
      setActiveButton("active");
      const filteredByActive = todos.filter(
        (todo) => todo.isCompleted == false
      );

      setTodosTemp(filteredByActive);
    }

    if (button === "completed") {
      setActiveButton("completed");

      const filteredByCompleted = todos.filter(
        (todo) => todo.isCompleted == true
      );
      setTodosTemp(filteredByCompleted);
    }
  };

  const clearCompletedTasks = () => {
    if (todos.filter((todo) => todo.isCompleted).length == 0) {
      alert("Completed болсон зүйл байхгүй байна!");
    } else {
      const confirmClear = window.confirm("Та устгахдаа итгэлтэй байна уу?");
      if (!confirmClear) return;
    }
    // confirm("Та устгахдаа итгэлтэй байна уу?");

    const uncheckedTodos = todos.filter((todo) => todo.isCompleted == false);
    setTodos(uncheckedTodos);
    setTodosTemp(uncheckedTodos);

    const completedCount = uncheckedTodos.filter(
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
            setNewTodo({
              id: 0,
              taskName: `${e.target.value}`,
              isCompleted: false,
            })
          }
        />
        <button onClick={addTodoHandler}>Add</button>
      </div>
      <div className={styles.filterSection}>
        <button
          className={activeButton == "all" && styles.activeButton}
          onClick={() => filterTasks("all")}
        >
          All
        </button>
        <button
          className={activeButton == "active" && styles.activeButton}
          onClick={() => filterTasks("active")}
        >
          Active
        </button>
        <button
          className={activeButton == "completed" && styles.activeButton}
          onClick={() => filterTasks("completed")}
        >
          Completed
        </button>
      </div>

      <div className={styles.todoSection}>
        {todos.length == 0 ? (
          <p className={styles.noTaskDesc}>No tasks yet. Add one above!</p>
        ) : (
          ""
        )}
        {activeButton === "all" && todosTemp.length
          ? todosTemp.map((todo, index) => {
              return (
                <div key={index} className={styles.todoContainer}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => checkedTasks1(todo.id)}
                      checked={todo.isCompleted}
                    ></input>
                    <p>{todo.taskName}</p>
                  </div>
                  <button
                    className={styles.taskDeleteButton}
                    onClick={() => deleteTodo1(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : ""}

        {activeButton === "active" && todosTemp.length
          ? todosTemp
              .filter((todo) => !todo.isCompleted)
              .map((todo, index) => {
                return (
                  <div key={index} className={styles.todoContainer}>
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => checkedTasks1(todo.id)}
                        checked={todo.isCompleted}
                      ></input>
                      <p>{todo.taskName}</p>
                    </div>
                    <button
                      className={styles.taskDeleteButton}
                      onClick={() => deleteTodo1(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
          : ""}

        {activeButton === "completed" && todosTemp.length
          ? todosTemp
              .filter((todo) => todo.isCompleted)
              .map((todo, index) => {
                return (
                  <div key={index} className={styles.todoContainer}>
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => checkedTasks1(todo.id)}
                        checked={todo.isCompleted}
                      ></input>
                      <p>{todo.taskName}</p>
                    </div>
                    <button
                      className={styles.taskDeleteButton}
                      onClick={() => deleteTodo1(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
          : ""}
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
        <p>Powered by</p>
        <a href="https://www.pinecone.mn/">Pinecone academy</a>
      </div>
    </div>
  );
};
