
import React, { useState } from "react";
import "../styles/CreateTodoForm.css";

const CreateTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          completed,
          userId: 1, // required by the API
        }),
      });

      const newTodo = await res.json();
      onAdd(newTodo);
      setTitle("");
      setCompleted(false);
    } catch (err) {
      console.error("Error creating todo:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-todo-form">
      <h3 className="create-todo__heading">Create New Todo</h3>
      <input
        type="text"
        value={title}
        placeholder="Todo title"
        onChange={(e) => setTitle(e.target.value)}
        required
        className="create-todo__input"
      />
      <label className="create-todo__checkbox-label">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="create-todo__checkbox"
        />
        Completed
      </label>
      <button type="submit" disabled={loading} className="create-todo__button">
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default CreateTodoForm;
