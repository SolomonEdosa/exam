import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/NewTodoPage.css";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      completed,
      userId: 1,
    };

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!res.ok) throw new Error("Failed to create todo");

      const data = await res.json();
      console.log("Created todo:", data);
      alert(`Todo created with id ${data.id}`);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      alert("Creation failed.");
    }
  };

  return (
    <main className="new-todo__container">
    <h2 className="new-todo__heading">Create New Todo</h2>
  
    <form onSubmit={handleSubmit} className="new-todo__form">
      <div className="new-todo__field">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="new-todo__input"
        />
      </div>
  
      <div className="new-todo__field">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={completed}
          onChange={(e) => setCompleted(e.target.value === "true")}
          className="new-todo__select"
        >
          <option value="false">Incomplete</option>
          <option value="true">Completed</option>
        </select>
      </div>
  
      <div className="new-todo__buttons">
        <button type="submit" className="new-todo__button">
          Create
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="new-todo__back"
        >
          Back
        </button>
      </div>
    </form>
  </main>
  
  );
};

export default CreateTodo;
