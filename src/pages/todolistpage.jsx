import EditTodoForm from "../components/EditTodoForm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../styles/TodoListPage.css";
import "../styles/todolistpage.css"

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  const updateLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
          localStorage.setItem("todos", JSON.stringify(data));
        });
    }
  }, []);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.json())
  //     .then((data) => setTodos(data));
  // }, []);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.completed
        : !todo.completed;

    return matchesSearch && matchesFilter;
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
   <main className="task-app">
  <header className="task-app__header">
    <img src="/icon.png" alt="Task Icon" className="task-app__icon" />
    <h1 className="task-app__title">📝 My Todo App</h1>
  </header>

  <section className="task-app__search">
    <input
      type="text"
      placeholder="Search todos..."
      className="task-app__input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select
      className="task-app__input"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="incomplete">Incomplete</option>
    </select>
    <Link to="/new">
      <button className="task-app__button">➕ Add</button>
    </Link>
  </section>

  <ul className="task-app__list">
    {currentTodos.map((todo) => (
      <li
        key={todo.id}
        className={`task-item task-item--${
          todo.completed ? "completed" : "incomplete"
        }`}
      >
        <div className="task-item__content">
          <span className="task-item__icon">
            {todo.completed ? "✅" : "❌"}
          </span>
          <Link
            to={`/todos/${todo.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {todo.title}
          </Link>
        </div>

        <div className="task-item__actions">
          <button
            className="task-item__edit"
            onClick={() => setEditingTodoId(todo.id)}
          >
            ✏️
          </button>
          <button
            className="task-item__edit"
            style={{ backgroundColor: "#f4a3a3" }}
            onClick={() => {
              const updated = todos.filter((t) => t.id !== todo.id);
              updateLocalStorage(updated);
            }}
          >
            🗑️
          </button>
        </div>
      </li>
    ))}
  </ul>
</main>

  );
};

export default TodoListPage;
